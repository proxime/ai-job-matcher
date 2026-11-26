import * as path from "node:path";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";

const webDistPath = path.join(__dirname, "../../apps/web/dist");

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const webBucket = new s3.Bucket(this, "WebBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const webDistribution = new cloudfront.Distribution(
      this,
      "WebDistribution",
      {
        comment: "Job Coast web app",
        defaultRootObject: "index.html",
        defaultBehavior: {
          origin: origins.S3BucketOrigin.withOriginAccessControl(webBucket),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        errorResponses: [403, 404].map((httpStatus) => ({
          httpStatus,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        })),
      },
    );

    new s3deploy.BucketDeployment(this, "WebDeployment", {
      sources: [s3deploy.Source.asset(webDistPath)],
      destinationBucket: webBucket,
      distribution: webDistribution,
      distributionPaths: ["/*"],
    });

    new cdk.CfnOutput(this, "WebUrl", {
      value: `https://${webDistribution.distributionDomainName}`,
    });
  }
}

import { Match, Template } from "aws-cdk-lib/assertions";
import * as cdk from "aws-cdk-lib/core";
import { InfraStack } from "../lib/infra-stack";

const template = Template.fromStack(
  new InfraStack(new cdk.App(), "TestStack", {
    env: { region: "eu-north-1" },
  }),
);

test("the web bucket is private", () => {
  template.hasResourceProperties("AWS::S3::Bucket", {
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      IgnorePublicAcls: true,
      RestrictPublicBuckets: true,
    },
  });
});

test("CloudFront reads the bucket through origin access control", () => {
  template.resourceCountIs("AWS::CloudFront::OriginAccessControl", 1);
});

test("unknown paths fall back to index.html for client-side routing", () => {
  template.hasResourceProperties("AWS::CloudFront::Distribution", {
    DistributionConfig: {
      DefaultRootObject: "index.html",
      DefaultCacheBehavior: { ViewerProtocolPolicy: "redirect-to-https" },
      CustomErrorResponses: Match.arrayWith([
        Match.objectLike({
          ErrorCode: 403,
          ResponseCode: 200,
          ResponsePagePath: "/index.html",
        }),
        Match.objectLike({
          ErrorCode: 404,
          ResponseCode: 200,
          ResponsePagePath: "/index.html",
        }),
      ]),
    },
  });
});

test("the stack outputs the web address", () => {
  template.hasOutput("WebUrl", {});
});

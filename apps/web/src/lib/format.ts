const dateFormat = new Intl.DateTimeFormat("pl-PL", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const formatDate = (isoDate: string) =>
  dateFormat.format(new Date(isoDate));

export const formatContractNumber = (number: number) =>
  `#${String(number).padStart(3, "0")}`;

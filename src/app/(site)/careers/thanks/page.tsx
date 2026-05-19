import ApplicationThanks from "@/app/components/pages/ApplicationThanks";

export const metadata = {
  title: "Thanks - L&C Food Distribution",
  robots: { index: false },
};

type SearchParams = { from?: string };

export default function ApplicationThanksPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const backHref = searchParams?.from ? `/careers/${searchParams.from}` : "/careers";

  return <ApplicationThanks backHref={backHref} />;
}

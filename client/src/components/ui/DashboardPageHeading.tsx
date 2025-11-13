interface Props {
  heading: string;
}

function DashboardPageHeading({ heading }: Props) {
  return <h1 className="text-xl md:text-3xl  font-semibold mb-8 ">{heading}</h1>;
}

export default DashboardPageHeading;

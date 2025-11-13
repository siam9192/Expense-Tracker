interface Props {
  heading: string;
}
function DashboardSectionHeading({ heading }: Props) {
  return <h1 className="text-xl md:text-2xl font-semibold text-primary ">{heading}</h1>;
}

export default DashboardSectionHeading;

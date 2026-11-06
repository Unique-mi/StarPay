type FormHeadingProps = {
  title: string;
  description: string;
};

export default function FormHeading({ title, description }: FormHeadingProps) {
  return (
    <>
      <h1 className="form-title">{title}</h1>
      <p className="form-description">{description}</p>
    </>
  );
}

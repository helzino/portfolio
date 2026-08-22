import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell notfound">
      <p className="meta meta-dim">404</p>
      <h1 className="display display-lg">Nothing in frame</h1>
      <p className="body notfound-line">
        That page has moved on. The work is all still here.
      </p>
      <Link href="/" className="meta link-underline">
        Back to the beginning
      </Link>
    </section>
  );
}

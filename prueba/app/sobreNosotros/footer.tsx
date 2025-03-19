
"use client";

import { Footer } from "flowbite-react";

export function MyFooter() {
  return (
    <Footer container className="mt-auto rounded-none">
      <Footer.Copyright href="#" by="Flowbite™" year={2022} />
      <Footer.LinkGroup>
        <Footer.Link href="#">Juan Gonzalez</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}


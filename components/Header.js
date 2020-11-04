import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Card from "../components/Card";
import { useRouter } from "next/router";

export default function Header(props) {
  const { title } = props;
  return (
    <div className="flex mb-4 mt-4 items-center">
      <div className="w-1/2 flex items-center">
        <Link href="/">
          <a className="text-lg text-gray-700">
            {title !== "ajatdarojat45" && <span>⬅️</span>} /{title}
          </a>
        </Link>
      </div>
      <div className="w-1/2 flex justify-end items-center">
        <span>🌝</span>
      </div>
    </div>
  );
}

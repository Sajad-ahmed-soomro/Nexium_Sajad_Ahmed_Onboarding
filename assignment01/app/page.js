"use client"

import Image from "next/image";
import ClientForm from "@/components/ClientForm"


export default function Home() {
  return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 ">
          <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md mb-30 ">
            <h1 className="text-2xl font-semibold mb-6 text-center ">Quote Generator</h1>
              <ClientForm/>
          </div>
      </main>
    );
}

import Verify from "@/components/Verify";
import React from "react";

const VerifyPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Verify id={id} />
    </div>
  );
};

export default VerifyPage;

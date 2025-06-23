import React, { Suspense } from "react";
import Payment from "./PaymentInner";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Payment />
    </Suspense>
  );
};

export default page;

import React, { useCallback } from "react";

function CertificationPage() {
  const onClickCertification = async () => {
    const IMP = window.IMP;
    console.log("IMP? ", IMP);
  };

  return (
    <button
      onClick={onClickCertification}
      style={{ backgroundColor: "blue", color: "#fff" }}
    >
      본인인증 클릭
    </button>
  );
}

export default CertificationPage;

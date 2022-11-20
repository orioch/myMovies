import React from "react";
import { ColorRing } from "react-loader-spinner";
import "../css/loadingPage.css";

export default function LoadingPage() {
  return (
    <div className="loading-page">
      <ColorRing />
    </div>
  );
}

import { Suspense } from "react";
import CollectionsPageContent from "./CollectionsPageContent";

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Loading...</div>}>
      <CollectionsPageContent />
    </Suspense>
  );
}

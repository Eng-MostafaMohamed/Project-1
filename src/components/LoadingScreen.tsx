import { Spinner } from "@heroui/react";

export default function LoadingScreen() {
  return (
    <div className="py-20 text-center">
      <Spinner color="current" />
    </div>
  );
}

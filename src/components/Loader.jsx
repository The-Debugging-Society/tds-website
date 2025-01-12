
import HyperText from "./ui/hyper-text";

export function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="relative flex flex-col items-center justify-center">
        <HyperText className="text-8xl text-blue-400" startOnView={true} duration={2000}>
          TDS
        </HyperText>
        </div>
      </div>
  );
}

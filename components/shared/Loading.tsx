import { Loader2 } from "lucide-react";
import { FC } from "react";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="text-center space-y-2 text-gray-500">
      <Loader2 className="w-20 h-20 mx-auto animate-spin " />
    </div>
  );
};

export default Loading;

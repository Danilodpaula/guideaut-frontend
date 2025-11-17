import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingInputProps {
  onAvaliar: (nota: number) => void;
  disabled: boolean;
}

export const StarRatingInput: React.FC<StarRatingInputProps> = ({
  onAvaliar,
  disabled,
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">
        Sua avaliação:
      </span>
      <div className="flex" onMouseLeave={() => setHover(0)}>
        {[...Array(5)].map((_, index) => {
          const nota = index + 1;
          return (
            <button
              key={nota}
              type="button"
              disabled={disabled}
              onClick={() => onAvaliar(nota)}
              onMouseEnter={() => setHover(nota)}
              className={cn("disabled:pointer-events-none disabled:opacity-50")}
              aria-label={`Avaliar com ${nota} estrelas`}
            >
              <Star
                className={cn(
                  "h-6 w-6 cursor-pointer",
                  nota <= (hover || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

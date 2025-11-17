import React from "react";
import { Star } from "lucide-react";
import { useI18n } from "@/core/i18n/I18nContext";

interface StarRatingDisplayProps {
  media: number;
  total: number;
}

export const StarRatingDisplay: React.FC<StarRatingDisplayProps> = ({
  media,
  total,
}) => {
  const { t } = useI18n();
  const fullStars = Math.floor(media);
  const halfStar = media - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="h-5 w-5 fill-yellow-400 text-yellow-400"
          />
        ))}
        {halfStar && (
          <Star
            key="half"
            className="h-5 w-5"
            style={{
              fill: "url(#half_grad)",
              stroke: "rgb(250 204 21)",
            }}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        ({total} {total === 1 ? "voto" : "votos"})
      </span>

      {/* Definição do gradiente para meia estrela */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="half_grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="50%"
              style={{ stopColor: "rgb(250 204 21)", stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "rgb(209 213 219)", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

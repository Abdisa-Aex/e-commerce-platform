import React, { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { NO_IMAGE } from "../../utils";

// Big image with zoom on hover + a thumbnail strip (below on phones, beside on desktop)
const ProductZoom = ({ images = [] }) => {
  const list = images.length ? images : [NO_IMAGE];
  const [active, setActive] = useState(0);
  const current = list[Math.min(active, list.length - 1)];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      {list.length > 1 && (
        <div className="flex md:flex-col gap-2 md:w-[15%] overflow-auto md:max-h-[500px]">
          {list.map((src, i) => (
            <button
              type="button"
              key={src + i}
              onClick={() => setActive(i)}
              className={`item rounded-md overflow-hidden cursor-pointer shrink-0 w-[64px] md:w-full ${
                i === active ? "opacity-100 ring-2 ring-[#ff5252]" : "opacity-50"
              }`}>
              <img src={src} alt="" loading="lazy" className="w-full h-[64px] md:h-auto object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="zoomContainer w-full md:w-[85%] overflow-hidden">
        <InnerImageZoom key={current} src={current} zoomSrc={current} zoomType="hover" zoomScale={1} />
      </div>
    </div>
  );
};

export default ProductZoom;

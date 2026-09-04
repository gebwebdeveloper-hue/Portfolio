import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CountUp({ value }) {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;

    const match = value.match(/\d+/);

    if (!match) {
      element.textContent = value;
      return;
    }

    const number = parseInt(match[0]);

    const counter = { value: 0 };

    ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      once: true,

      onEnter: () => {
        gsap.to(counter, {
          value: number,
          duration: 2,
          ease: "power3.out",

          onUpdate: () => {
            let text = Math.floor(counter.value).toString();

            if (value.includes("%"))
              text += "%";

            else if (value.includes("+"))
              text += "+";

            else if (value.includes("/7"))
              text = `${Math.floor(counter.value)}/7`;

            element.textContent = text;
          }
        });
      }
    });

  }, [value]);

  return <strong ref={ref}>0</strong>;
}
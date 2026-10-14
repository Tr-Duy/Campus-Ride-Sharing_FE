import { useId } from 'react';
import AnimatedVisual from '../common/AnimatedVisual';

export default function RideLandscape() {
  const id = useId();
  return <AnimatedVisual className="hero-art ride-landscape" label="cảnh xe">
    <svg className="ride-landscape-svg" viewBox="0 0 600 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Minh họa xe liên tỉnh chạy qua đồi xanh dưới ánh nắng chiều">
      <defs>
        <linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor="#edd8b8" /><stop offset="1" stopColor="#fbf0dd" /></linearGradient>
        <linearGradient id={`${id}-road`} x2="0.3" y2="1"><stop stopColor="#78756d" /><stop offset="1" stopColor="#434742" /></linearGradient>
        <linearGradient id={`${id}-body`} x2="0" y2="1"><stop stopColor="#cd5d32" /><stop offset="1" stopColor="#8c321b" /></linearGradient>
      </defs>
      <path fill={`url(#${id}-sky)`} d="M0 0h600v520H0z" />
      <circle cx="422" cy="116" r="62" fill="#e5aa69" opacity=".28" /><circle cx="422" cy="116" r="44" fill="#efbf7b" />
      <g className="landscape-cloud landscape-cloud-one" fill="#fff9ec" opacity=".75"><path d="M50 108c-5-18 18-30 30-18 8-31 47-33 61-4 26-4 40 12 32 22Z" /></g>
      <g className="landscape-cloud landscape-cloud-two" fill="#fff9ec" opacity=".65"><path d="M304 62c0-13 17-18 25-9 8-22 37-20 43 0 19-4 32 6 29 17h-97Z" /></g>
      <path d="M0 246 87 170 171 230 255 149 367 253 486 183 600 246v274H0Z" fill="#b4b69a" />
      <path d="m196 202 59-53 64 59-47-14-18-24-22 31Z" fill="#e5e0ca" />
      <path d="M0 263c73-59 135-18 211 11s162-51 233-45 99 25 156 13v278H0Z" fill="#879a7a" />
      <path d="M0 326c107-71 157-47 222-30s150 36 222-12 104-31 156-17v253H0Z" fill="#607f63" />
      <path d="M0 382c92-81 191-31 274-38s189-86 326-48v224H0Z" fill="#436751" />
      <path d="M271 280c65 16 126 18 96 46S201 382 81 520h458C419 418 343 380 397 336s-20-45-91-59Z" fill="#d7c8ac" />
      <path d="M282 281c54 17 116 20 82 47S214 388 119 520h387C397 421 318 379 389 335s-24-47-83-57Z" fill={`url(#${id}-road)`} />
      <path className="landscape-road-markings" d="M295 285c62 18 95 23 59 50S270 385 220 438l-67 82" stroke="#eee5ce" strokeWidth="5" fill="none" strokeDasharray="18 22" />
      <path d="M0 439c42-35 68-38 91-34L10 520H0Z" fill="#274d3e" />
      <g fill="#315b46"><path d="m38 299 19-54 19 54Zm7-25 12-36 12 36Z" /><path d="m480 310 22-61 22 61Zm6-30 16-41 16 41Z" /><path d="m542 283 15-42 15 42Z" /></g>
      <g stroke="#b6b291" strokeWidth="4"><path d="M57 299v16M502 310v19M557 282v17" /></g>
      <g transform="translate(322 258)"><path d="M0 0v51" stroke="#e1d6bc" strokeWidth="3" /><rect x="-25" width="50" height="27" rx="4" fill="#f5efdc" /><path d="M-12 13h24m-6-6 6 6-6 6" fill="none" stroke="#436751" strokeWidth="3" /></g>
      <ellipse cx="349" cy="425" rx="101" ry="15" fill="#192c24" opacity=".25" />
      <g className="landscape-car">
        <path d="m256 365 21-53q5-10 19-10h57q11 0 19 10l38 46 17 9q9 6 9 17v24H248v-27q0-9 8-16Z" fill={`url(#${id}-body)`} />
        <path d="m283 314-15 40h56v-40Z" fill="#bacdd0" /><path d="M333 314v40h63l-32-40Z" fill="#a9bdc0" />
        <path d="m287 318-10 29h8l12-29Zm54 0v29h8v-29Z" fill="#e9eeee" opacity=".65" />
        <path d="M250 370h183M325 358v41" stroke="#7d2c19" strokeWidth="2" /><path d="M333 365h15" stroke="#edb393" strokeWidth="4" strokeLinecap="round" />
        <path d="M392 376h41v10h-35Z" fill="#f6e8b7" /><path d="M251 377h11v12h-11Z" fill="#f6ba7d" /><rect x="414" y="394" width="24" height="7" rx="3" fill="#543e32" />
        {[285, 395].map(x => <g key={x} className="landscape-wheel" style={{ transformOrigin: `${x}px 405px` }}><circle cx={x} cy="405" r="23" fill="#273c35" /><circle cx={x} cy="405" r="13" fill="#b5b8ac" /><path d={`M${x} 394v22m-11-11h22`} stroke="#6c776b" strokeWidth="3" /><circle cx={x} cy="405" r="4" fill="#e9e6d9" /></g>)}
        <rect x="275" y="294" width="82" height="7" rx="3" fill="#465f53" /><path d="M285 294v-6h61v6" fill="none" stroke="#465f53" strokeWidth="4" />
      </g>
    </svg>
    <div className="hero-caption"><span className="pill">Cung Đường / đi cùng nhau</span><p>Từ Hải Phòng đến những hành trình mới.</p><span className="visual-demo-label">Minh họa hành trình liên tỉnh</span></div>
  </AnimatedVisual>;
}

#!/bin/bash
# Create a simple OG image using ASCII art approach
cat > /tmp/og.ppm << 'PPM'
P3
1200 630
255
PPM

# Fill with gradient purple background
for y in $(seq 0 629); do
  for x in $(seq 0 1199); do
    r=$((102 + y/10))
    g=$((126 - y/20))  
    b=$((234 - y/3))
    echo "$r $g $b" >> /tmp/og.ppm
  done
done

# Convert PPM to PNG if possible
if command -v pnmtopng >/dev/null 2>&1; then
  pnmtopng /tmp/og.ppm > public/og-image.png
  echo "Created og-image.png"
else
  echo "Cannot create PNG, using SVG instead"
  cat > public/og-image.svg << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#grad)"/>
  <text x="600" y="200" font-size="72" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial, sans-serif">🚨 여자친구가 괜찮아 할 때</text>
  <text x="600" y="300" font-size="72" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial, sans-serif">진짜 의미는?</text>
  <text x="600" y="420" font-size="48" fill="rgba(255,255,255,0.9)" text-anchor="middle" font-family="Arial, sans-serif">ISTJ: 정말 괜찮음 ✅</text>
  <text x="600" y="480" font-size="48" fill="rgba(255,255,255,0.9)" text-anchor="middle" font-family="Arial, sans-serif">INFP: 엄청 화남 💥</text>
  <text x="600" y="560" font-size="36" fill="rgba(255,255,255,0.8)" text-anchor="middle" font-family="Arial, sans-serif">MBTI별 진짜 속마음 256가지</text>
</svg>
SVGEOF
fi

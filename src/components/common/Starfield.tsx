// 배경의 작은 별

interface Star { 
  id: number; 
  top: number; 
  left: number; 
  size: number; 
  delay: number; 
  duration: number; 
} 

const STAR_COUNT = 20; 
const pseudoRandom = (seed: number) => { 
  const value = Math.sin(seed * 12.9898) * 43758.5453; 
  return value - Math.floor(value); 
}; 
  
const stars: Star[] = Array.from({ length: STAR_COUNT }, (_, index) => ({ 
  id: index, 
  top: pseudoRandom(index * 1.1) * 100, 
  left: pseudoRandom(index * 2.3) * 100, 
  size: pseudoRandom(index * 3.7) * 2 + 1, 
  delay: pseudoRandom(index * 4.1) * 8, 
  duration: pseudoRandom(index * 5.3) * 2 + 1, 
})); 

const Starfield = () => { 
  return ( 
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden overflow-hidden dark:block" > 
      {stars.map((star) => ( 
        <span key={star.id} 
          className="star absolute rounded-full bg-foreground opacity-0" 
          style={{ 
            top: `${star.top}%`, 
            left: `${star.left}%`, 
            width: `${star.size}px`, 
            height: `${star.size}px`, 
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`, 
          }} 
        /> 
      ))} 
    </div> 
  ); 
}; 

export default Starfield;
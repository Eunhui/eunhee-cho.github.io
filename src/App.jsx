import { useState, useEffect } from "react";
import PixelSilhouette from "./PixelSilhouette";

const C = {
  bg:        "#0a192f",
  bgLight:   "#112240",
  bgCard:    "#0d2137",
  border:    "#1d3a5c",
  mint:      "#64ffda",
  mintDim:   "rgba(100,255,218,0.08)",
  mintBorder:"rgba(100,255,218,0.25)",
  text:      "#ccd6f6",
  textDim:   "#8892b0",
  white:     "#e6f1ff",
};

const ROLES = [
  "Software Engineer.",
  "Data Platform Engineer.",
  "Full Stack Developer.",
  "ML Enthusiast.",
];

function useTyping(strings, speed = 80, pause = 2000) {
  const [out, setOut] = useState("");
  const [si, setSi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = strings[si];
    let t;
    if (!del && ci < cur.length)       t = setTimeout(() => setCi(c => c + 1), speed);
    else if (!del && ci === cur.length) t = setTimeout(() => setDel(true), pause);
    else if (del && ci > 0)            t = setTimeout(() => setCi(c => c - 1), speed / 2);
    else { setDel(false); setSi(i => (i + 1) % strings.length); }
    setOut(cur.slice(0, ci));
    return () => clearTimeout(t);
  }, [ci, del, si, strings, speed, pause]);
  return out;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:100,
      display:"flex",justifyContent:"space-between",alignItems:"center",
      padding:"0 48px",height:"70px",
      background: scrolled ? "rgba(10,25,47,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition:"all 0.3s",
    }}>
      <span style={{color:C.mint,fontFamily:"'JetBrains Mono',monospace",fontSize:"20px",fontWeight:700,cursor:"pointer"}}
        onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>EC</span>
      <div style={{display:"flex",gap:"36px",alignItems:"center"}}>
        {[["About","about"],["Experience","experience"],["Projects","projects"],["Contact","contact"]].map(([label,id],i) => (
          <button key={id} onClick={() => scrollTo(id)} style={{
            background:"none",border:"none",cursor:"pointer",
            color:C.textDim,fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",transition:"color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = C.mint}
            onMouseLeave={e => e.currentTarget.style.color = C.textDim}
          ><span style={{color:C.mint}}>0{i+1}. </span>{label}</button>
        ))}
        <a href="mailto:eunheecho1008@gmail.com" style={{
          color:C.mint,border:`1px solid ${C.mint}`,padding:"8px 18px",borderRadius:"4px",
          fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",textDecoration:"none",transition:"background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = C.mintDim}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >Resume</a>
      </div>
    </nav>
  );
}

function SocialSidebar() {
  const sideStyle = { color:C.textDim,textDecoration:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",transition:"color 0.2s, transform 0.2s" };
  const onEnter = e => { e.currentTarget.style.color=C.mint; e.currentTarget.style.transform="translateY(-3px)"; };
  const onLeave = e => { e.currentTarget.style.color=C.textDim; e.currentTarget.style.transform="none"; };
  return (
    <>
      <div style={{position:"fixed",bottom:0,left:"32px",zIndex:50,display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"}}>
        {[{href:"https://github.com/Eunhui",label:"GH"},{href:"https://linkedin.com/in/eunhee-cho-echo",label:"in"}].map(l => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" style={sideStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>{l.label}</a>
        ))}
        <div style={{width:"1px",height:"80px",background:C.textDim}}/>
      </div>
      <div style={{position:"fixed",bottom:0,right:"32px",zIndex:50,display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"}}>
        <a href="mailto:eunheecho1008@gmail.com" style={{...sideStyle,writingMode:"vertical-rl",letterSpacing:"0.1em"}} onMouseEnter={onEnter} onMouseLeave={onLeave}>
          eunheecho1008@gmail.com
        </a>
        <div style={{width:"1px",height:"80px",background:C.textDim}}/>
      </div>
    </>
  );
}

function Hero() {
  const typed = useTyping(ROLES);
  return (
    <section id="hero" style={{
      minHeight:"100vh",display:"flex",alignItems:"center",
      padding:"0 120px",maxWidth:"1200px",margin:"0 auto",gap:"60px",
    }}>
      <div style={{flexShrink:0,width:"360px"}}>
        <PixelSilhouette />
      </div>
      <div>
        <p style={{color:C.mint,fontFamily:"'JetBrains Mono',monospace",fontSize:"16px",marginBottom:"16px"}}>Hi, my name is</p>
        <h1 style={{fontSize:"clamp(36px,6vw,72px)",fontWeight:700,color:C.white,margin:"0 0 8px",lineHeight:1.1,fontFamily:"'DM Sans',sans-serif",letterSpacing:"-0.02em"}}>
          Eunhee Cho.
        </h1>
        <h2 style={{fontSize:"clamp(22px,4vw,48px)",fontWeight:700,color:C.textDim,margin:"0 0 28px",lineHeight:1.15,fontFamily:"'DM Sans',sans-serif",minHeight:"56px"}}>
          {typed}<span style={{borderRight:`3px solid ${C.mint}`,marginLeft:"2px",animation:"blink 1s step-end infinite"}}/>
        </h2>
        <p style={{color:C.textDim,maxWidth:"480px",lineHeight:1.85,fontSize:"16px",marginBottom:"40px",fontFamily:"'DM Sans',sans-serif"}}>
          Software engineer specializing in <span style={{color:C.mint}}>data pipelines</span> and{" "}
          <span style={{color:C.mint}}>cloud infrastructure</span>. Currently building ETL workflows at{" "}
          <span style={{color:C.mint}}>USA TODAY</span>.
        </p>
        <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}
            style={{color:C.mint,border:`1px solid ${C.mint}`,background:"transparent",padding:"16px 28px",borderRadius:"4px",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:"14px",transition:"background 0.2s"}}
            onMouseEnter={e => e.currentTarget.style.background=C.mintDim}
            onMouseLeave={e => e.currentTarget.style.background="transparent"}
          >Check out my work</button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
            style={{color:C.textDim,border:"none",background:"transparent",padding:"16px 0",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:"14px",transition:"color 0.2s"}}
            onMouseEnter={e => e.currentTarget.style.color=C.mint}
            onMouseLeave={e => e.currentTarget.style.color=C.textDim}
          >Get in touch →</button>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({num,title}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"52px"}}>
      <span style={{color:C.mint,fontFamily:"'JetBrains Mono',monospace",fontSize:"18px"}}>0{num}.</span>
      <h2 style={{color:C.white,fontSize:"clamp(22px,3vw,28px)",fontWeight:700,margin:0,fontFamily:"'DM Sans',sans-serif"}}>{title}</h2>
      <div style={{flex:1,height:"1px",background:C.border}}/>
    </div>
  );
}

function About() {
  const skills = ["Python","SQL","Java","JavaScript","Dart","GCP / BigQuery","Apache Airflow","Apache Spark","dbt","Terraform","AWS","React / React Native","Flutter","TensorFlow","OpenCV","Elasticsearch","Firebase"];
  return (
    <section id="about" style={{padding:"100px 160px",maxWidth:"1100px",margin:"0 auto"}}>
      <SectionTitle num={1} title="About Me"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"60px"}}>
        <div>
          <p style={{color:C.textDim,lineHeight:1.9,fontSize:"16px",marginBottom:"16px",fontFamily:"'DM Sans',sans-serif"}}>
            Hi! I'm Eunhee, a software engineer based in New York City. I love building things that live on the internet — from data pipelines to full-stack apps.
          </p>
          <p style={{color:C.textDim,lineHeight:1.9,fontSize:"16px",marginBottom:"32px",fontFamily:"'DM Sans',sans-serif"}}>
            Currently at <span style={{color:C.mint}}>USA TODAY Co.</span>, I build Python-based Airflow ETL pipelines on GCP BigQuery. I've also worked on ML systems, Android apps, and presented research at the <span style={{color:C.mint}}>United Nations</span>.
          </p>
          <p style={{color:C.textDim,fontSize:"15px",marginBottom:"20px",fontFamily:"'DM Sans',sans-serif"}}>Technologies I've been working with:</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
            {skills.map(s => (
              <div key={s} style={{display:"flex",alignItems:"center",gap:"10px",color:C.textDim,fontFamily:"'JetBrains Mono',monospace",fontSize:"12px"}}>
                <span style={{color:C.mint}}>▹</span>{s}
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"flex-start"}}>
          <div style={{width:"280px",height:"300px",borderRadius:"8px",overflow:"hidden",border:`2px solid ${C.mint}`,boxShadow:`8px 8px 0 ${C.mintBorder}`,position:"relative",top:"12px",left:"12px"}}>
            <img src="/src/photo.jpg" alt="Eunhee Cho" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",filter:"grayscale(10%)"}}/>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [active,setActive] = useState(0);
  const jobs = [
    { company:"USA TODAY", title:"Software Engineer, Data Platform", period:"Jul 2023 – Present",
      points:["Built Python-based Airflow pipelines and GCP BigQuery to automate ETL workflows for marketing, subscription, and editorial teams","Developed and scheduled dbt models via Airflow for standardized data transformation on BigQuery","Architected metadata ingestion pipelines from Collibra into BigQuery via REST API","Streamlined multi-channel data delivery across GCS, BigQuery and SFTP","Implemented CI/CD pipeline to automate encryption and decryption of PII"] },
    { company:"USA TODAY", title:"Software Engineer, Data Quality", period:"Aug 2022 – Jul 2023",
      points:["Defined and executed YAML-based data quality rules using GCP Dataplex to validate audience and behavioral datasets","Collaborated with cross-functional teams to investigate and resolve data issues in operational tables"] },
  ];
  return (
    <section id="experience" style={{padding:"100px 160px",maxWidth:"1100px",margin:"0 auto"}}>
      <SectionTitle num={2} title="Experience"/>
      <div style={{display:"grid",gridTemplateColumns:"180px 1fr"}}>
        <div style={{borderLeft:`2px solid ${C.border}`}}>
          {jobs.map((j,i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              display:"block",width:"100%",padding:"14px 20px",textAlign:"left",cursor:"pointer",border:"none",
              borderLeft: active===i ? `2px solid ${C.mint}` : "2px solid transparent",
              marginLeft:"-2px",
              color: active===i ? C.mint : C.textDim,
              background: active===i ? C.mintDim : "transparent",
              fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",transition:"all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background=C.mintDim; e.currentTarget.style.color=C.mint; }}
              onMouseLeave={e => { if(active!==i){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=C.textDim; }}}
            >{j.company}</button>
          ))}
        </div>
        <div style={{padding:"0 32px"}}>
          <h3 style={{color:C.white,fontSize:"20px",fontWeight:600,margin:"0 0 6px",fontFamily:"'DM Sans',sans-serif"}}>
            {jobs[active].title} <span style={{color:C.mint}}>@ {jobs[active].company}</span>
          </h3>
          <p style={{color:C.textDim,fontFamily:"'JetBrains Mono',monospace",fontSize:"12px",marginBottom:"24px"}}>{jobs[active].period}</p>
          <ul style={{listStyle:"none",padding:0,margin:0}}>
            {jobs[active].points.map((pt,i) => (
              <li key={i} style={{display:"flex",gap:"12px",marginBottom:"14px",color:C.textDim,fontSize:"15px",lineHeight:1.7,fontFamily:"'DM Sans',sans-serif"}}>
                <span style={{color:C.mint,flexShrink:0,marginTop:"4px"}}>▹</span>{pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({title,desc,tags,links}) {
  const [hov,setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: hov ? C.bgCard : C.bgLight,
      border:`1px solid ${hov ? C.mint : C.border}`,
      borderRadius:"8px",padding:"28px",transition:"all 0.2s",
      transform: hov ? "translateY(-6px)" : "none",
      boxShadow: hov ? "0 20px 40px rgba(0,0,0,0.5)" : "none",
      display:"flex",flexDirection:"column",height:"100%",
    }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px"}}>
        <span style={{fontSize:"26px",color:C.mint}}>⬡</span>
        <div style={{display:"flex",gap:"12px"}}>
          {links.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
              style={{color:C.textDim,textDecoration:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:"12px",transition:"color 0.2s"}}
              onMouseEnter={e => e.currentTarget.style.color=C.mint}
              onMouseLeave={e => e.currentTarget.style.color=C.textDim}
            >{l.label} ↗</a>
          ))}
        </div>
      </div>
      <h3 style={{color:C.white,fontSize:"17px",fontWeight:700,margin:"0 0 10px",fontFamily:"'DM Sans',sans-serif"}}>{title}</h3>
      <p style={{color:C.textDim,lineHeight:1.7,fontSize:"14px",marginBottom:"20px",fontFamily:"'DM Sans',sans-serif",flex:1}}>{desc}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:"14px"}}>
        {tags.map(t => <span key={t} style={{color:C.mint,fontFamily:"'JetBrains Mono',monospace",fontSize:"11px"}}>{t}</span>)}
      </div>
    </div>
  );
}

function Projects() {
  const projects = [
    { title:"Data Platform @ USA TODAY", desc:"Built Python-based Airflow ETL pipelines on GCP BigQuery for marketing, subscription, and editorial teams. Enforced column-level security and implemented CI/CD for PII encryption.", tags:["Python","Airflow","BigQuery","dbt","GCP","Terraform"], links:[] },
    { title:"Hand Gesture Recognition", desc:"Real-time gesture classification system using Python, ML, OpenCV & MediaPipe. Achieved rotation & translation invariance via a coordinate transformation pipeline.", tags:["Python","ML","OpenCV & MediaPipe"], links:[{label:"GitHub",href:"https://github.com/Eunhui/hand-gesture-recognition"}] },
    { title:"EyeZesty", desc:"Android app to track eye movements and visualize gaze heatmaps based on auditory stimuli. Built a data pipeline using Nginx and Firebase for high-frequency coordinate data.", tags:["Java","Android","Firebase","Nginx","Python"], links:[{label:"GitHub",href:"https://github.com/Eunhui/EyeZesty"}] },
    { title:"Dark Web Link Analysis", desc:"Python-based dark web crawler to analyze relationships between dark/surface web users. Visualized suspicious linkages using Elasticsearch. Presented at the United Nations (UN).", tags:["Python","Elasticsearch","Web Crawling"], links:[] },
    { title:"Staffless Gym Management", desc:"Firebase-integrated React web platform for fully automated gym operations — trainer scheduling, client reservations, and admin dashboard for activity logs and payments.", tags:["React","Firebase","JavaScript"], links:[] },
  ];
  return (
    <section id="projects" style={{padding:"100px 160px",maxWidth:"1100px",margin:"0 auto"}}>
      <SectionTitle num={3} title="Projects"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:"18px"}}>
        {projects.map(p => <ProjectCard key={p.title} {...p}/>)}
      </div>
    </section>
  );
}
function Activities() {
  return (
    <section id="activities" style={{padding:"100px 160px",maxWidth:"1100px",margin:"0 auto"}}>
      <SectionTitle num={4} title="Activities"/>
      <div style={{
        background:C.bgLight,border:`1px solid ${C.border}`,
        borderRadius:"8px",padding:"32px 36px",
        display:"flex",alignItems:"center",gap:"24px",
        transition:"border-color 0.2s",
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor=C.mint}
        onMouseLeave={e => e.currentTarget.style.borderColor=C.border}
      >
        <span style={{color:C.mint,fontSize:"28px",flexShrink:0}}>🏆</span>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"6px"}}>
            <h3 style={{color:C.white,fontSize:"18px",fontWeight:700,margin:0,fontFamily:"'DM Sans',sans-serif"}}>
              <a href="https://hackmhs.com/" target="_blank" rel="noreferrer"
                style={{color:C.white,textDecoration:"none",transition:"color 0.2s"}}
                onMouseEnter={e => e.currentTarget.style.color=C.mint}
                onMouseLeave={e => e.currentTarget.style.color=C.white}
              >HackMHS XI</a>
            </h3>
            <span style={{color:C.mint,fontFamily:"'JetBrains Mono',monospace",fontSize:"12px",border:`1px solid ${C.mintBorder}`,padding:"2px 10px",borderRadius:"100px"}}>
              Judge
            </span>
          </div>
          <p style={{color:C.textDim,fontFamily:"'JetBrains Mono',monospace",fontSize:"12px",marginBottom:"8px"}}>2025</p>
          <p style={{color:C.textDim,fontSize:"14px",lineHeight:1.7,fontFamily:"'DM Sans',sans-serif",margin:0}}>
            Served as a judge at HackMHS XI, one of New Jersey's largest high school hackathons.
          </p>
        </div>
      </div>
    </section>
  );
}
function Contact() {
  return (
    <section id="contact" style={{padding:"100px 160px 140px",maxWidth:"660px",margin:"0 auto",textAlign:"center"}}>
      <p style={{color:C.mint,fontFamily:"'JetBrains Mono',monospace",fontSize:"14px",marginBottom:"16px"}}>04. What's Next?</p>
      <h2 style={{color:C.white,fontSize:"clamp(36px,5vw,56px)",fontWeight:700,margin:"0 0 20px",fontFamily:"'DM Sans',sans-serif"}}>Get In Touch</h2>
      <p style={{color:C.textDim,lineHeight:1.85,fontSize:"16px",marginBottom:"48px",fontFamily:"'DM Sans',sans-serif"}}>
        I'm currently open to new opportunities in software engineering & data engineering. Whether you have a question or just want to say hi — my inbox is always open!
      </p>
      <a href="mailto:eunheecho1008@gmail.com" style={{
        color:C.mint,border:`1px solid ${C.mint}`,padding:"18px 44px",borderRadius:"4px",
        textDecoration:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:"15px",
        transition:"background 0.2s",display:"inline-block",
      }}
        onMouseEnter={e => e.currentTarget.style.background=C.mintDim}
        onMouseLeave={e => e.currentTarget.style.background="transparent"}
      >Say Hi!</a>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{textAlign:"center",padding:"24px",borderTop:`1px solid ${C.border}`}}>
      <p style={{color:C.textDim,fontFamily:"'JetBrains Mono',monospace",fontSize:"12px"}}>
        Built by <span style={{color:C.mint}}>Eunhee Cho</span> · 2026
      </p>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');
      *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
      html{scroll-behavior:smooth;}
      body{background:#0a192f;overflow-x:hidden;}
      @keyframes blink{50%{opacity:0;}}
      ::-webkit-scrollbar{width:6px;}
      ::-webkit-scrollbar-track{background:#0a192f;}
      ::-webkit-scrollbar-thumb{background:#1d3a5c;border-radius:3px;}
      button{font-family:inherit;}
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div style={{background:C.bg,color:C.text,minHeight:"100vh"}}>
      <Navbar/>
      <SocialSidebar/>
      <Hero/>
      <About/>
      <Experience/>
      <Projects/>
      <Activities/>
      <Contact/>
      <Footer/>
    </div>
  );
}

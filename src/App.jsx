import { useState, useEffect } from "react";
import PixelSilhouette from "./PixelSilhouette";
import photo from "./photo.jpg";

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

const ROLES = ["Software Engineer.","Data Platform Engineer.","Full Stack Developer.","ML Enthusiast."];

function useTyping(strings, speed=80, pause=2000) {
  const [out,setOut]=useState(""); const [si,setSi]=useState(0); const [ci,setCi]=useState(0); const [del,setDel]=useState(false);
  useEffect(()=>{
    const cur=strings[si]; let t;
    if(!del&&ci<cur.length) t=setTimeout(()=>setCi(c=>c+1),speed);
    else if(!del&&ci===cur.length) t=setTimeout(()=>setDel(true),pause);
    else if(del&&ci>0) t=setTimeout(()=>setCi(c=>c-1),speed/2);
    else{setDel(false);setSi(i=>(i+1)%strings.length);}
    setOut(cur.slice(0,ci)); return()=>clearTimeout(t);
  },[ci,del,si,strings,speed,pause]);
  return out;
}

function useIsMobile() {
  const [mobile,setMobile]=useState(window.innerWidth<768);
  useEffect(()=>{const fn=()=>setMobile(window.innerWidth<768); window.addEventListener("resize",fn); return()=>window.removeEventListener("resize",fn);},[]);
  return mobile;
}

function Navbar() {
  const [scrolled,setScrolled]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const mobile=useIsMobile();
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>20); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn);},[]);
  const scrollTo=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false);};
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 24px",height:"70px",background:scrolled?"rgba(10,25,47,0.97)":"transparent",backdropFilter:scrolled?"blur(12px)":"none",borderBottom:scrolled?`1px solid ${C.border}`:"none",transition:"all 0.3s"}}>
      <span style={{color:C.mint,fontFamily:"'JetBrains Mono',monospace",fontSize:"20px",fontWeight:700,cursor:"pointer"}} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>EC</span>
      {mobile?(
        <>
          <button onClick={()=>setMenuOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",color:C.mint,fontSize:"22px"}}>☰</button>
          {menuOpen&&(
            <div style={{position:"fixed",top:"70px",left:0,right:0,bottom:0,background:"rgba(10,25,47,0.98)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"32px",zIndex:200}}>
              {[["About","about"],["Experience","experience"],["Projects","projects"],["Contact","contact"]].map(([label,id],i)=>(
                <button key={id} onClick={()=>scrollTo(id)} style={{background:"none",border:"none",cursor:"pointer",color:C.text,fontFamily:"'JetBrains Mono',monospace",fontSize:"18px"}}>
                  <span style={{color:C.mint}}>0{i+1}. </span>{label}
                </button>
              ))}
            </div>
          )}
        </>
      ):(
        <div style={{display:"flex",gap:"36px",alignItems:"center"}}>
          {[["About","about"],["Experience","experience"],["Projects","projects"],["Contact","contact"]].map(([label,id],i)=>(
            <button key={id} onClick={()=>scrollTo(id)} style={{background:"none",border:"none",cursor:"pointer",color:C.textDim,fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",transition:"color 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.color=C.mint} onMouseLeave={e=>e.currentTarget.style.color=C.textDim}>
              <span style={{color:C.mint}}>0{i+1}. </span>{label}
            </button>
          ))}
          <a href="mailto:eunheecho1008@gmail.com" style={{color:C.mint,border:`1px solid ${C.mint}`,padding:"8px 18px",borderRadius:"4px",fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",textDecoration:"none",transition:"background 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.background=C.mintDim} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>Resume</a>
        </div>
      )}
    </nav>
  );
}

function SocialSidebar() {
  const mobile=useIsMobile(); if(mobile) return null;
  const s={color:C.textDim,textDecoration:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",transition:"color 0.2s, transform 0.2s"};
  const e=el=>{el.style.color=C.mint;el.style.transform="translateY(-3px)";};
  const l=el=>{el.style.color=C.textDim;el.style.transform="none";};
  return(<>
    <div style={{position:"fixed",bottom:0,left:"32px",zIndex:50,display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"}}>
      {[{href:"https://github.com/Eunhui",label:"GH"},{href:"https://linkedin.com/in/eunhee-cho-echo",label:"in"}].map(lk=>(
        <a key={lk.href} href={lk.href} target="_blank" rel="noreferrer" style={s} onMouseEnter={ev=>e(ev.currentTarget)} onMouseLeave={ev=>l(ev.currentTarget)}>{lk.label}</a>
      ))}
      <div style={{width:"1px",height:"80px",background:C.textDim}}/>
    </div>
    <div style={{position:"fixed",bottom:0,right:"32px",zIndex:50,display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"}}>
      <a href="mailto:eunheecho1008@gmail.com" style={{...s,writingMode:"vertical-rl",letterSpacing:"0.1em"}} onMouseEnter={ev=>e(ev.currentTarget)} onMouseLeave={ev=>l(ev.currentTarget)}>eunheecho1008@gmail.com</a>
      <div style={{width:"1px",height:"80px",background:C.textDim}}/>
    </div>
  </>);
}

function Hero() {
  const typed=useTyping(ROLES); const mobile=useIsMobile();
  return(
    <section id="hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:mobile?"80px 24px 40px":"0 120px",maxWidth:"1200px",margin:"0 auto",gap:"40px",flexDirection:mobile?"column":"row"}}>
      <div style={{flexShrink:0,width:"360px"}}><PixelSilhouette/></div>
      <div style={{textAlign:mobile?"center":"left"}}>
        <p style={{color:C.mint,fontFamily:"'JetBrains Mono',monospace",fontSize:mobile?"13px":"16px",marginBottom:"16px"}}>Hi, my name is</p>
        <h1 style={{fontSize:mobile?"clamp(36px,10vw,52px)":"clamp(36px,6vw,72px)",fontWeight:700,color:C.white,margin:"0 0 8px",lineHeight:1.1,fontFamily:"'DM Sans',sans-serif",letterSpacing:"-0.02em"}}>Eunhee Cho.</h1>
        <h2 style={{fontSize:mobile?"clamp(20px,6vw,32px)":"clamp(22px,4vw,48px)",fontWeight:700,color:C.textDim,margin:"0 0 28px",lineHeight:1.15,fontFamily:"'DM Sans',sans-serif",minHeight:"40px"}}>
          {typed}<span style={{borderRight:`3px solid ${C.mint}`,marginLeft:"2px",animation:"blink 1s step-end infinite"}}/>
        </h2>
        <p style={{color:C.textDim,maxWidth:"480px",lineHeight:1.85,fontSize:mobile?"14px":"16px",marginBottom:"40px",fontFamily:"'DM Sans',sans-serif",margin:mobile?"0 auto 40px":"0 0 40px"}}>
          Software engineer specializing in <span style={{color:C.mint}}>data pipelines</span> and <span style={{color:C.mint}}>cloud infrastructure</span>. Currently building ETL workflows at <span style={{color:C.mint}}>USA TODAY</span>.
        </p>
        <div style={{display:"flex",gap:"16px",flexWrap:"wrap",justifyContent:mobile?"center":"flex-start"}}>
          <button onClick={()=>document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}
            style={{color:C.mint,border:`1px solid ${C.mint}`,background:"transparent",padding:"14px 24px",borderRadius:"4px",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",transition:"background 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.background=C.mintDim} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>Check out my work</button>
          <button onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
            style={{color:C.textDim,border:"none",background:"transparent",padding:"14px 0",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",transition:"color 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.color=C.mint} onMouseLeave={e=>e.currentTarget.style.color=C.textDim}>Get in touch →</button>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({num,title}) {
  return(
    <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"48px"}}>
      <span style={{color:C.mint,fontFamily:"'JetBrains Mono',monospace",fontSize:"16px",flexShrink:0}}>0{num}.</span>
      <h2 style={{color:C.white,fontSize:"clamp(20px,3vw,26px)",fontWeight:700,margin:0,fontFamily:"'DM Sans',sans-serif",flexShrink:0}}>{title}</h2>
      <div style={{flex:1,height:"1px",background:C.border}}/>
    </div>
  );
}

function About() {
  const mobile=useIsMobile();
  const skills=["Python","SQL","Java","JavaScript","Dart","GCP / BigQuery","Apache Airflow","Apache Spark","dbt","Terraform","AWS","React / React Native","Flutter","TensorFlow","OpenCV","Elasticsearch","Firebase"];
  return(
    <section id="about" style={{padding:mobile?"60px 24px":"100px 120px",maxWidth:"1100px",margin:"0 auto"}}>
      <SectionTitle num={1} title="About Me"/>
      <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:mobile?"40px":"60px"}}>
        <div>
          <p style={{color:C.textDim,lineHeight:1.9,fontSize:"15px",marginBottom:"16px",fontFamily:"'DM Sans',sans-serif"}}>Hi! I'm Eunhee, a software engineer based in New York City. I love building things that live on the internet — from data pipelines to full-stack apps.</p>
          <p style={{color:C.textDim,lineHeight:1.9,fontSize:"15px",marginBottom:"32px",fontFamily:"'DM Sans',sans-serif"}}>Currently at <span style={{color:C.mint}}>USA TODAY Co.</span>, I build Python-based Airflow ETL pipelines on GCP BigQuery. I've also worked on ML systems, Android apps, and presented research at the <span style={{color:C.mint}}>United Nations</span>.</p>
          <p style={{color:C.textDim,fontSize:"14px",marginBottom:"16px",fontFamily:"'DM Sans',sans-serif"}}>Technologies I've been working with:</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
            {skills.map(s=><div key={s} style={{display:"flex",alignItems:"center",gap:"8px",color:C.textDim,fontFamily:"'JetBrains Mono',monospace",fontSize:"12px"}}><span style={{color:C.mint}}>▹</span>{s}</div>)}
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:mobile?"center":"flex-start"}}>
          <div style={{width:mobile?"200px":"260px",height:mobile?"220px":"280px",borderRadius:"8px",overflow:"hidden",border:`2px solid ${C.mint}`,boxShadow:`8px 8px 0 ${C.mintBorder}`,position:"relative",top:"12px",left:"12px"}}>
            <img src={photo} alt="Eunhee Cho" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",filter:"grayscale(10%)"}}/>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [active,setActive]=useState(0); const mobile=useIsMobile();
  const jobs=[
    {company:"USA TODAY",title:"Software Engineer, Data Platform",period:"Jul 2023 – Present",points:["Built Python-based Airflow pipelines and GCP BigQuery to automate ETL workflows for marketing, subscription, and editorial teams","Developed and scheduled dbt models via Airflow for standardized data transformation on BigQuery","Architected metadata ingestion pipelines from Collibra into BigQuery via REST API","Streamlined multi-channel data delivery across GCS, BigQuery and SFTP","Implemented CI/CD pipeline to automate encryption and decryption of PII"]},
    {company:"USA TODAY",title:"Software Engineer, Data Quality",period:"Aug 2022 – Jul 2023",points:["Defined and executed YAML-based data quality rules using GCP Dataplex to validate audience and behavioral datasets","Collaborated with cross-functional teams to investigate and resolve data issues in operational tables"]},
    {company:"Ggeulrim Fitness",title:"React Web Developer",period:"Jan 2021 – Apr 2021",points:["Built a Firebase-integrated React web platform for staffless gym management","Implemented an admin dashboard to track client activity logs, session history and payment records"]},
  ];
  return(
    <section id="experience" style={{padding:mobile?"60px 24px":"100px 120px",maxWidth:"1100px",margin:"0 auto"}}>
      <SectionTitle num={2} title="Experience"/>
      <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"160px 1fr",gap:0}}>
        <div style={{display:"flex",flexDirection:mobile?"row":"column",borderLeft:mobile?"none":"2px solid "+C.border,borderBottom:mobile?`2px solid ${C.border}`:"none",marginBottom:mobile?"24px":0,overflowX:mobile?"auto":"visible"}}>
          {jobs.map((j,i)=>(
            <button key={i} onClick={()=>setActive(i)} style={{
              padding:mobile?"12px 16px":"14px 20px",textAlign:"left",cursor:"pointer",border:"none",whiteSpace:"nowrap",
              borderLeft:!mobile&&active===i?`2px solid ${C.mint}`:"2px solid transparent",
              borderBottom:mobile&&active===i?`2px solid ${C.mint}`:"none",
              marginLeft:!mobile?"-2px":0,marginBottom:mobile?"-2px":0,
              color:active===i?C.mint:C.textDim,background:active===i?C.mintDim:"transparent",
              fontFamily:"'JetBrains Mono',monospace",fontSize:"12px",transition:"all 0.2s",
            }}>{j.company}</button>
          ))}
        </div>
        <div style={{padding:mobile?"0":"0 32px"}}>
          <h3 style={{color:C.white,fontSize:"18px",fontWeight:600,margin:"0 0 6px",fontFamily:"'DM Sans',sans-serif"}}>{jobs[active].title} <span style={{color:C.mint}}>@ {jobs[active].company}</span></h3>
          <p style={{color:C.textDim,fontFamily:"'JetBrains Mono',monospace",fontSize:"12px",marginBottom:"20px"}}>{jobs[active].period}</p>
          <ul style={{listStyle:"none",padding:0,margin:0}}>
            {jobs[active].points.map((pt,i)=>(
              <li key={i} style={{display:"flex",gap:"12px",marginBottom:"12px",color:C.textDim,fontSize:"14px",lineHeight:1.7,fontFamily:"'DM Sans',sans-serif"}}>
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
  const [hov,setHov]=useState(false);
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{background:hov?C.bgCard:C.bgLight,border:`1px solid ${hov?C.mint:C.border}`,borderRadius:"8px",padding:"24px",transition:"all 0.2s",transform:hov?"translateY(-4px)":"none",display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px"}}>
        <span style={{fontSize:"24px",color:C.mint}}>⬡</span>
        <div style={{display:"flex",gap:"12px"}}>
          {links.map(l=><a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{color:C.textDim,textDecoration:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:"12px",transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color=C.mint} onMouseLeave={e=>e.currentTarget.style.color=C.textDim}>{l.label} ↗</a>)}
        </div>
      </div>
      <h3 style={{color:C.white,fontSize:"16px",fontWeight:700,margin:"0 0 10px",fontFamily:"'DM Sans',sans-serif"}}>{title}</h3>
      <p style={{color:C.textDim,lineHeight:1.7,fontSize:"13px",marginBottom:"16px",fontFamily:"'DM Sans',sans-serif",flex:1}}>{desc}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:"12px"}}>
        {tags.map(t=><span key={t} style={{color:C.mint,fontFamily:"'JetBrains Mono',monospace",fontSize:"11px"}}>{t}</span>)}
      </div>
    </div>
  );
}

function Projects() {
  const mobile=useIsMobile();
  const projects=[
    {title:"Data Platform @ USA TODAY",desc:"Built Python-based Airflow ETL pipelines on GCP BigQuery for marketing, subscription, and editorial teams. Enforced column-level security and implemented CI/CD for PII encryption.",tags:["Python","Airflow","BigQuery","dbt","GCP","Terraform"],links:[]},
    {title:"Hand Gesture Recognition",desc:"Real-time gesture classification system using Python, ML, OpenCV & MediaPipe. Achieved rotation & translation invariance via a coordinate transformation pipeline.",tags:["Python","ML","OpenCV & MediaPipe"],links:[{label:"GitHub",href:"https://github.com/Eunhui/hand-gesture-recognition"}]},
    {title:"EyeZesty",desc:"Android app to track eye movements and visualize gaze heatmaps based on auditory stimuli. Built a data pipeline using Nginx and Firebase for high-frequency coordinate data.",tags:["Java","Android","Firebase","Nginx","Python"],links:[{label:"GitHub",href:"https://github.com/Eunhui/EyeZesty"}]},
    {title:"Dark Web Link Analysis",desc:"Python-based dark web crawler to analyze relationships between dark/surface web users. Visualized suspicious linkages using Elasticsearch. Presented at the United Nations (UN).",tags:["Python","Elasticsearch","Web Crawling"],links:[]},
    {title:"Staffless Gym Management",desc:"Firebase-integrated React web platform for fully automated gym operations — trainer scheduling, client reservations, and admin dashboard for activity logs and payments.",tags:["React","Firebase","JavaScript"],links:[]},
  ];
  return(
    <section id="projects" style={{padding:mobile?"60px 24px":"100px 120px",maxWidth:"1100px",margin:"0 auto"}}>
      <SectionTitle num={3} title="Projects"/>
      <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"repeat(auto-fill, minmax(280px, 1fr))",gap:"16px"}}>
        {projects.map(p=><ProjectCard key={p.title} {...p}/>)}
      </div>
    </section>
  );
}

function Activities() {
  const mobile=useIsMobile();
  return(
    <section id="activities" style={{padding:mobile?"60px 24px":"100px 120px",maxWidth:"1100px",margin:"0 auto"}}>
      <SectionTitle num={4} title="Activities"/>
      <div style={{background:C.bgLight,border:`1px solid ${C.border}`,borderRadius:"8px",padding:"28px",display:"flex",alignItems:mobile?"flex-start":"center",gap:"20px",flexDirection:mobile?"column":"row",transition:"border-color 0.2s"}}
        onMouseEnter={e=>e.currentTarget.style.borderColor=C.mint} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
        <span style={{color:C.mint,fontSize:"26px",flexShrink:0}}>🏆</span>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"6px",flexWrap:"wrap"}}>
            <h3 style={{color:C.white,fontSize:"17px",fontWeight:700,margin:0,fontFamily:"'DM Sans',sans-serif"}}>
              <a href="https://hackmhs.com/" target="_blank" rel="noreferrer" style={{color:C.white,textDecoration:"none",transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color=C.mint} onMouseLeave={e=>e.currentTarget.style.color=C.white}>HackMHS XI</a>
            </h3>
            <span style={{color:C.mint,fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",border:`1px solid ${C.mintBorder}`,padding:"2px 10px",borderRadius:"100px"}}>Judge</span>
          </div>
          <p style={{color:C.textDim,fontFamily:"'JetBrains Mono',monospace",fontSize:"12px",marginBottom:"8px"}}>2025</p>
          <p style={{color:C.textDim,fontSize:"14px",lineHeight:1.7,fontFamily:"'DM Sans',sans-serif",margin:0}}>Served as a judge at HackMHS XI, one of New Jersey's largest high school hackathons, evaluating student projects across creativity, technical execution, and impact.</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const mobile=useIsMobile();
  return(
    <section id="contact" style={{padding:mobile?"60px 24px 100px":"100px 120px 140px",maxWidth:"660px",margin:"0 auto",textAlign:"center"}}>
      <p style={{color:C.mint,fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",marginBottom:"16px"}}>05. What's Next?</p>
      <h2 style={{color:C.white,fontSize:"clamp(32px,5vw,52px)",fontWeight:700,margin:"0 0 20px",fontFamily:"'DM Sans',sans-serif"}}>Get In Touch</h2>
      <p style={{color:C.textDim,lineHeight:1.85,fontSize:mobile?"14px":"16px",marginBottom:"40px",fontFamily:"'DM Sans',sans-serif"}}>I'm currently open to new opportunities in software engineering & data engineering. Whether you have a question or just want to say hi — my inbox is always open!</p>
      <a href="mailto:eunheecho1008@gmail.com" style={{color:C.mint,border:`1px solid ${C.mint}`,padding:"16px 36px",borderRadius:"4px",textDecoration:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:"14px",transition:"background 0.2s",display:"inline-block"}}
        onMouseEnter={e=>e.currentTarget.style.background=C.mintDim} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>Say Hi!</a>
    </section>
  );
}

function Footer() {
  return(<footer style={{textAlign:"center",padding:"24px",borderTop:`1px solid ${C.border}`}}><p style={{color:C.textDim,fontFamily:"'JetBrains Mono',monospace",fontSize:"12px"}}>Built by <span style={{color:C.mint}}>Eunhee Cho</span> · 2026</p></footer>);
}

export default function App() {
  useEffect(()=>{
    const style=document.createElement("style");
    style.textContent=`
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
  },[]);
  return(
    <div style={{background:C.bg,color:C.text,minHeight:"100vh"}}>
      <Navbar/><SocialSidebar/><Hero/><About/><Experience/><Projects/><Activities/><Contact/><Footer/>
    </div>
  );
}

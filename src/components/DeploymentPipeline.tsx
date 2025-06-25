import React, { useState, useEffect } from 'react';

// --- Types (unchanged) ---
export interface PipelineStageInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
}

// --- Icons and Constants (unchanged) ---
const CodeIcon: React.FC = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const DeployIcon: React.FC = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
  </svg>
);

const TerraformIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25L3 7.5l9 5.25 9-5.25L12 2.25z" />
  </svg>
);

const AnsibleIcon: React.FC = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93s.844-.024 1.144-.282l.686-.631c.43-.398 1.033-.398 1.464 0l.774.721c.43.398.43 1.023 0 1.422l-.686.631c-.3.258-.495.632-.495 1.037s.196.779.495 1.037l.686.631c.43.398.43 1.022 0 1.422l-.774.72c-.43.398-1.034.398-1.464 0l-.686-.631c-.3-.258-.733-.406-1.144-.282a1.123 1.123 0 01-.78.93l-.149.894c-.09.542-.56.94-1.11.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.149-.894a1.123 1.123 0 01-.78-.93c-.41-.124-.844.024-1.144.282l-.686.631c-.43.398-1.033-.398-1.464 0l-.774-.721c-.43-.398-.43-1.023 0-1.422l.686-.631c.3-.258.495-.632-.495-1.037s-.196-.779-.495-1.037l-.686-.631c-.43-.398-.43-1.022 0-1.422l.774-.72c.43.398 1.034.398 1.464 0l.686.631c.3.258.733.406 1.144.282a1.123 1.123 0 01.78-.93l.149-.894z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
  </svg>
);

const K3sClusterIcon: React.FC = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-3 6h3m-6.75 6h9.5M4.5 6h.008v.008H4.5V6zm0 6h.008v.008H4.5v-6zm0 6h.008v.008H4.5v-6zM19.5 6h.008v.008H19.5V6zm0 6h.008v.008H19.5v-6zm0 6h.008v.008H19.5v-6zM15 12h.008v.008H15V12zm-6 0h.008v.008H9V12z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-19.5 0a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25m-19.5 0v.25A2.25 2.25 0 004.5 17.25h15a2.25 2.25 0 002.25-2.25v-.25" />
  </svg>
);

const FluxIcon: React.FC = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const ActionsIcon: React.FC = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
  </svg>
);

const ContainerRegistryIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);

const PIPELINE_STAGES: PipelineStageInfo[] = [
  { id: 'terraform', name: 'Terraform', icon: <TerraformIcon /> },
  { id: 'ansible-install-k3s', name: 'Ansible Install\u00A0K3s', icon: <AnsibleIcon /> },
  { id: 'helm-traefik', name: 'Helm Traefik', icon: <K3sClusterIcon /> },
  { id: 'flux-install', name: 'Flux Install', icon: <FluxIcon /> },
  { id: 'code-push', name: 'Code Push', icon: <CodeIcon /> },
  { id: 'pipeline', name: 'Pipeline', icon: <ActionsIcon /> },
  { id: 'image-repo', name: 'Image Repo', icon: <ContainerRegistryIcon /> },
  { id: 'image-detection', name: 'Image Detection', icon: <FluxIcon /> }, 
  { id: 'deploy', name: 'Deploy', icon: <DeployIcon /> },                 
];

const ANIMATION_INTERVAL_MS = 2500;
const LINE_FILL_DURATION_MS = 1000;

// --- DeploymentPipeline Component ---
const DeploymentPipeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (PIPELINE_STAGES.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % PIPELINE_STAGES.length);
    }, ANIMATION_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  if (PIPELINE_STAGES.length === 0) {
    return (
        // [BACKGROUND] Changed empty state background from slate to gray
        <div className="w-full flex items-center justify-center h-16 sm:h-20 md:h-24 bg-gray-900 p-1 sm:p-2 md:p-3 rounded-lg shadow-inner text-gray-400">
            No pipeline stages defined.
        </div>
    );
  }

  return (
    // [BACKGROUND] Changed main component background from slate to gray
    <div className="w-full flex items-start justify-between h-16 sm:h-20 md:h-24 bg-gray-950/80 p-1 sm:p-2 md:p-3 rounded-lg shadow-xl select-none overflow-hidden">
      {PIPELINE_STAGES.map((stage: PipelineStageInfo, index: number) => {
        const isActive = index === activeIndex;
        const isCompleted = index < activeIndex;

        const iconWrapperBaseClass = isActive 
            ? "w-9 h-9 sm:w-10 md:w-11 h-9 sm:h-10 md:h-11"
            : "w-7 h-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9";   
        
        const svgIconBaseClass = isActive
            ? "w-4.5 h-4.5 sm:w-5 md:w-5.5 h-4.5 sm:h-5 md:h-5.5"
            : "w-3.5 h-3.5 sm:w-4 md:w-4.5 h-3.5 sm:h-4 md:h-4.5";

        return (
          <React.Fragment key={stage.id}>
            <div 
              className={`
                group flex flex-col items-center text-center 
                px-0.5 sm:px-1 
                flex-1 
                min-w-[44px] max-w-[60px] 
                sm:min-w-[54px] sm:max-w-[75px] 
                md:min-w-[66px] md:max-w-[90px]
              `}
            >
              <div 
                className={`
                  relative 
                  flex items-center justify-center
                  mb-0.5 sm:mb-1 md:mb-1.5 
                  transition-all duration-300 ease-in-out
                  ${iconWrapperBaseClass}
                `}
              >
                <div 
                  className={`
                    w-full h-full rounded-full flex items-center justify-center
                    transition-all duration-300 ease-in-out transform
                    group-hover:scale-110
                    ${/* [ICON BG] Replaced custom classes with Tailwind */ ''}
                    ${isActive ? 'scale-105 sm:scale-110 shadow-lg bg-lime-500/20 shine-animated' : 'shadow-md'}
                    ${isCompleted ? 'bg-green-500/20 shine-animated' : ''}
                    ${!isActive && !isCompleted ? 'bg-gray-800' : ''}
                  `}
                >
                  <div className={`text-white transition-all duration-300 ease-in-out ${svgIconBaseClass}`}>
                    {stage.icon}
                  </div>
                </div>
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-full h-full 
                                 rounded-full border-2 sm:border-2 md:border-3 border-green-500 border-t-transparent 
                                 animate-spin-custom"
                    ></div>
                  </div>
                )}
              </div>
              <span 
                className={`
                  text-[0.55rem] leading-tight 
                  sm:text-[0.65rem] sm:leading-snug 
                  md:text-xs md:leading-snug
                  w-full px-px sm:px-0.5
                  transition-colors duration-300
                  group-hover:font-semibold
                  ${/* [ACCENT] Changed active text from sky to lime */''}
                  ${isActive ? 'text-lime-300 font-medium' : ''}
                  ${isCompleted ? 'text-green-300' : ''}
                  ${!isActive && !isCompleted ? 'text-gray-400' : ''}
                `}
                title={stage.name}
              >
                {stage.name}
              </span>
            </div>

            {index < PIPELINE_STAGES.length - 1 && (
              <div 
                className={`
                  relative flex-grow 
                  h-[2px] sm:h-[3px] md:h-1 
                  mx-[2px] sm:mx-1 
                  bg-gray-700 rounded-full overflow-hidden shadow-inner
                  min-w-[6px] sm:min-w-[9px] md:min-w-[12px]
                `}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                  style={{ 
                    width: index < activeIndex ? '100%' : '0%',
                    transitionProperty: 'width',
                    transitionDuration: `${LINE_FILL_DURATION_MS}ms`,
                    transitionTimingFunction: 'ease-out'
                  }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DeploymentPipeline;


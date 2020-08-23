import React from 'react'

const LoaderSVG = require('./loader.svg') as string

interface InfScrollProps {
  children:any,
  loader?:any,
  onReachEnd:()=>Promise<unknown>|any,
  showLoader?:boolean,
  triggerSize?:string,
}

/** @description InfScroll - модуль бесконечной прогрузки*.
 * @typedef {Object<any>} Props
 * @property {any} children элемент(ы), находящийся внутри.
 * @property {any} loader элемент загрузки или текст.
 * @property {()=>Promise<unknown>} onReachEnd функция, вызываемая при достижении конца списка.
 * @property {boolean} showLoader выключатель компонента загрузки.
 * @property {string} triggerSize размер зоны срабатывания (50px).
 * @returns {JSX.Element} элемент с содержимой датой и значком прогрузки
 * @example 
 * <InfScroll onReachEnd={changeData} showLoader={true}>
		  {data.map((_,i)=><Card key={i} i={i}/>)}
	  </InfScroll>
 */
export const InfScroll: React.FC<InfScrollProps> = ({
  children,
  loader=<img style={{width: '100%', height: '100px'}} src={LoaderSVG} alt="Загрузка ..." />,
  onReachEnd,
  showLoader=true,
  triggerSize='50px',
}): JSX.Element => {
  const rootRef = React.createRef<HTMLDivElement>();
  const bottomRef = React.createRef<HTMLDivElement>();
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const scrollCallback = async (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting&&!isLoading) {
      setLoading(true);
      await onReachEnd()
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  React.useEffect(() => {
    const scroll = new IntersectionObserver(scrollCallback, {
      root: rootRef.current!,
      rootMargin: triggerSize
    });
    scroll.observe(bottomRef.current!);
    return () => {
      scroll.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef, bottomRef]);

  return <div ref={rootRef} style={{height:'100vh',overflowY: 'scroll'}}>
    {children}
    <div ref={bottomRef} />
    {showLoader&&loader}
  </div>
}

export default InfScroll
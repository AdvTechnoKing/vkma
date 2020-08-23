import React from 'react';

const LoaderSVG = require('./loader.svg');
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
const InfScroll = ({ children, loader = React.createElement("img", { style: { width: '100%', height: '100px' }, src: LoaderSVG, alt: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 ..." }), onReachEnd, showLoader = true, triggerSize = '50px', }) => {
    const rootRef = React.createRef();
    const bottomRef = React.createRef();
    const [isLoading, setLoading] = React.useState(false);
    const scrollCallback = async (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
            setLoading(true);
            await onReachEnd();
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };
    React.useEffect(() => {
        const scroll = new IntersectionObserver(scrollCallback, {
            root: rootRef.current,
            rootMargin: triggerSize
        });
        scroll.observe(bottomRef.current);
        return () => {
            scroll.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rootRef, bottomRef]);
    return React.createElement("div", { ref: rootRef, style: { height: '100vh', overflowY: 'scroll' } },
        children,
        React.createElement("div", { ref: bottomRef }),
        showLoader && loader);
};

export { InfScroll };
//# sourceMappingURL=index.es.js.map

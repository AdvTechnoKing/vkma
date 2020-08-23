'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
const InfScroll = ({ children, loader = React__default['default'].createElement("img", { style: { width: '100%', height: '100px' }, src: LoaderSVG, alt: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 ..." }), onReachEnd, showLoader = true, triggerSize = '50px', }) => {
    const rootRef = React__default['default'].createRef();
    const bottomRef = React__default['default'].createRef();
    const [isLoading, setLoading] = React__default['default'].useState(false);
    const scrollCallback = async (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
            setLoading(true);
            await onReachEnd();
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };
    React__default['default'].useEffect(() => {
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
    return React__default['default'].createElement("div", { ref: rootRef, style: { height: '100vh', overflowY: 'scroll' } },
        children,
        React__default['default'].createElement("div", { ref: bottomRef }),
        showLoader && loader);
};

exports.InfScroll = InfScroll;
//# sourceMappingURL=index.js.map

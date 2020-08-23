import React from 'react';
interface InfScrollProps {
    children: any;
    loader?: any;
    onReachEnd: () => Promise<unknown> | any;
    showLoader?: boolean;
    triggerSize?: string;
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
export declare const InfScroll: React.FC<InfScrollProps>;
export default InfScroll;

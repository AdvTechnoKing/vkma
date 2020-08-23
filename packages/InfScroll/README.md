# @vkma/infscroll
Модуль, позволяющий создать бесконечный скролл*.

## Установка
`$ yarn add @vkma/infscroll` или  `$ npm i @vkma/infscroll`

## Пример использования

```javascript
import InfScroll from '@vkma/infscroll'

const App = () => {
  const [data,setData] = React.useState<number[]>([])
	const [showLoader, setShowLoader] = React.useState<boolean>(true)

	const changeData = () => {
		return new Promise(response=>{
			fetch(`https://ban.su/offset?offset=${data.length}&count=20`)
			.then(e=>e.json())
			.then(res=>{
				setData(e=>[...e,...res])
				response(true)
			})
			.catch(()=>{
				setShowLoader(false)
			})
		})
	}

	return <InfScroll onReachEnd={changeData} showLoader={showLoader}>
		{data.map((e,i)=><Card key={i} i={e}/>)}
	</InfScroll>
}

export default App;
```

## Параметры
`loader` {`any`} - визуальный элемент подгрузки, располагающийся внизу.

`showLoader` {`boolean`} - переключатель отображения загрузки данных.

`onReachEnd` {`()=>Promise<unknown>`}  - Promise функция, при достижении конца. Promise обязателен, во избежание дублирования данных.

`triggerSize` {`string`} - зона срабатывания функции, по умолчанию 50px от низа.

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import envManager, {useEnvSelector} from '../dist/index'

envManager.add('default', '默认',[
    {
        name: 'a.b.c',
        value: 'https://dev.com'
    },
    {
        name: 'a.b.d',
        value: 'https://dev2.com'
    },
    {
        name: 'b',
        value: 'https://dev2.com' 
    }
])

envManager.add('prod', '生产',[
    {
        name: 'a.b.c',
        value: 'https://prod.com'
    },
    {
        name: 'a.b.d',
        value: 'https://prod2.com'
    },
    {
        name: 'b',
        value: 'https://dev2.com' 
    }
])

envManager.add('TAO', '淘宝',[
    {
        name: 'a.b.c',
        value: 'https://taobao.com'
    },
    {
        name: 'a.b.d',
        value: 'https://taobao2.com'
    },
    {
        name: 'b',
        value: 'https://taobao3.com' 
    }
])


envManager.setCurrent('default')

const ArrayShowWithEvent: React.FC<any> = () => {
    const url: any = useEnvSelector((state) => state.a.b.c)
    const urlB: any = useEnvSelector((state) => state.b)
    const handleChange =(val:string) => () => {
        envManager.setCurrent(val)
    }
    return <div>
    <div onClick={handleChange('prod')}>{url} {urlB}</div>
    <div onClick={handleChange('default')}>{url}</div>
    </div>
}

ReactDOM.render(<ArrayShowWithEvent />, document.getElementById('root'));

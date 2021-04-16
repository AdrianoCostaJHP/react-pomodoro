import {SideBar} from './SideBar';

export default function Layout ({children}) {
    return (
      <div style={{display: 'flex'}}>
      <SideBar/>
        {children}
      </div>
    )
  }
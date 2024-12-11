import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import './index.scss'

import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import Game from './Game/GameMain.jsx'
import { GetReady } from './Game/GetReady.jsx'
import { Information } from './Game/Information.jsx'
import { AboutParty } from './Pages/AboutParty/AboutParty.jsx'
import { Claim } from './Pages/Claim.jsx'
import { CreateParty } from './Pages/CreateParty/CreateParty.jsx'
import { CreateSquad } from './Pages/CreateSquad/CreateSquad.jsx'
import { EarnMore } from './Pages/EarnMore/EM.jsx'
import { Editing } from './Pages/Editing/Edit.jsx'
import { PlayOnMobile } from './Pages/MobileApp/MobApp.jsx'
import { Others } from './Pages/Others/Others.jsx'
import { Parties } from './Pages/Parties/Parties.jsx'
import { Store } from './Pages/Store/Store.jsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import {API_URL} from './config.js';

const URL = `${API_URL}/static/tonconnect-manifest.json`

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App />,
  },
  
  {
    path: "/parties",
    element: <Parties />,
  },
    
  {
    path: "/store",
    element: <Store />,
  },

  {
    path: "/earnmore",
    element: <EarnMore />,
  },
  {
    path: "/createparty",
    element: <CreateParty />,
  },
  {
    path: "/createsquad",
    element: <CreateSquad />,
  },
  {
    path: "/aboutparty",
    element: <AboutParty />,
  },
  {
    path: "/editing",
    element: <Editing />,
  },
  {
    path: "/others",
    element: <Others />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/getready",
    element: <GetReady />,
  },
  {
    path: "/information",
    element: <Information />,
  },
  {
    path: "/mobapp",
    element: <PlayOnMobile />,
  },
  {
    path: "/claim",
    element: <Claim />,
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl={URL}>
      <RouterProvider router={router} />
    </TonConnectUIProvider>
  </StrictMode>,
)

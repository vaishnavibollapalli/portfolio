import { createBrowserRouter } from 'react-router'
import Layout from '../components/Layout'
import Welcome from '../pages/Welcome'
import Home from '../pages/Home'
import About from '../pages/About'
import Projects from '../pages/Projects'
import ProjectDetail from '../pages/ProjectDetail'
import Research from '../pages/Research'
import Skills from '../pages/Skills'
import Contact from '../pages/Contact'
import { TransitionProvider } from '../components/Transition'

function LayoutWithTransition() {
  return (
    <TransitionProvider>
      <Layout />
    </TransitionProvider>
  )
}

export const router = createBrowserRouter([
  { path: '/', Component: Welcome },
  {
    path: '/',
    Component: LayoutWithTransition,
    children: [
      { path: 'home',         Component: Home },
      { path: 'about',        Component: About },
      { path: 'projects',     Component: Projects },
      { path: 'projects/:id', Component: ProjectDetail },
      { path: 'research',     Component: Research },
      { path: 'skills',       Component: Skills },
      { path: 'contact',      Component: Contact },
    ],
  },
])

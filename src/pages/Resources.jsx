import { useState } from 'react'
import FlipText from '../components/ui/flip-text'
import DSA from '../components/Resources/DSA'
import WebDev from '../components/Resources/WebDev'
import ML from '../components/Resources/ML'

const Resources = () => {
  const [selectedTab, setSelectedTab] = useState('DSA')

  const tabs = [
    { name: 'DSA', content: <DSA /> },
    { name: 'Web Development', content: <WebDev /> },
    { name: 'Machine Learning', content: <ML /> }
  ]

  return (
    <div>
      <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center p-8 w-full">
        <FlipText
          className="text-4xl font-bold -tracking-[6px] text-blue-500 md:text-7xl md:leading-[5rem]"
          word="Resources"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3">
        {tabs.map(tab => (
          <button
            key={tab.name}
            className={`w-64 py-3 text-sm md:text-lg font-semibold rounded-full md:rounded-xl text-gray-200 ${
              selectedTab === tab.name ? 'border-2 border-blue-500' : 'bg-gray-700/60'
            }`}
            onClick={() => setSelectedTab(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="mt-5">
        {tabs.find(tab => tab.name === selectedTab)?.content}
      </div>
    </div>
  )
}

export default Resources

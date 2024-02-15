import { Roulette } from "./components/roulette";


const selector = [
  {
    name: '1',
    color: 'royalblue'
  },
  {
    name: '2',
    color: 'salmon'
  },
  {
    name: '3',
    color: 'palegreen'
  },
  {
    name: '4',
    color: 'wheat'
  },
  {
    name: '5',
    color: 'plum'
  },
  {
    name: '6',
    color: 'royalblue'
  },
  {
    name: '7',
    color: 'salmon'
  },
  {
    name: '8',
    color: 'palegreen'
  }
]


export const Home = () => {

  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center h-screen">
        <Roulette selectors={selector} />
      </div>
    </div>
  );
}

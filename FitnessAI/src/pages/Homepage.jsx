import { Layout } from '../components/Layouts'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <Layout>
       <section className="relative flex items-center justify-center h-[80vh] overflow-hidden">
        <img
            src="https://wallpaperaccess.com/full/4722382.jpg"
            alt="Fitness Trainer"
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
            className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="relative text-center text-white bg-black bg-opacity-50 p-5 rounded-lg">
            <h1 className="text-5xl mb-4 font-bold">GALA PERSONAL FITNESS TRAINER</h1>
            <Link to="#book" className="btn bg-yellow-400 text-black px-6 py-2 rounded font-bold hover:bg-yellow-300">
                BOOK NOW
            </Link>
        </div>
    </section>
    </Layout>
  )
}
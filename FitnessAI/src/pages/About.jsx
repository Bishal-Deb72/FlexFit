import { Layout } from '../components/Layouts'



const About = () => {

  return (

    <Layout>
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-6 lg:px-20">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">About Us</h2>
                <p className="text-lg text-center text-gray-600 mb-12">
                    At Gala Personal Fitness Trainer, we are passionate about helping you achieve your fitness goals.
                    Our experienced trainers and personalized approach ensure that you get the best results, tailored to your needs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                        <p className="text-gray-600">
                            To empower individuals to lead healthier lives through personalized fitness training,
                            innovative programs, and expert guidance.
                        </p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
                        <p className="text-gray-600">
                            To be the leading provider of fitness solutions, fostering a community of health-conscious individuals who inspire others to achieve their goals.
                        </p>
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <a
                        href="#contact"
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-500"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    </Layout>
    
  )
}
export default About;

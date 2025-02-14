import React from 'react'
import { Layout } from '../component/layouts/layouts'
import { Link } from 'react-router-dom'


export const Priceing = () => {
  return (
    <Layout>
        <section className="bg-white py-24 sm:py-32">
        <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-indigo-600 text-base font-semibold">Pricing</h2>
            <p className="text-5xl font-semibold text-gray-900 sm:text-6xl mt-4">Choose the right plan for you</p>
            <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
                Choose an affordable plan that’s packed with the best features for engaging your audience.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 ring-1 ring-gray-200">
                <h3 className="text-indigo-600 text-base font-semibold">Hobby</h3>
                <p className="text-5xl font-semibold text-gray-900 mt-4">$29</p>
                <p className="text-gray-600 mt-6">The perfect plan if you're just getting started.</p>
                <ul className="mt-8 space-y-3 text-sm text-gray-600">
                    <li>25 products</li>
                    <li>Up to 10,000 subscribers</li>
                    <li>Advanced analytics</li>
                    <li>24-hour support response time</li>
                </ul>
                <Link to="#" className="mt-8 block bg-indigo-100 text-indigo-600 py-2.5 px-3.5 rounded-md text-center font-semibold">
                    Get started today
                </Link>
            </div>
        </div>
    </section>
    </Layout>
  )
}

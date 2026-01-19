import React from "react";
import { Link } from "react-router-dom";

export default function Pricing() {
    return (
        <div className="pricing-page">
            <div className="pricing-header">
                <h1>Invest in Your Peace</h1>
                <p>Choose the plan that best supports your emotional clarity journey.</p>
            </div>

            <div className="pricing-cards">
                <div className="pricing-card free">
                    <div className="card-header">
                        <h2>Free</h2>
                        <div className="price">$0<span>/forever</span></div>
                        <p>Essential tools for occasional untangling.</p>
                    </div>
                    <ul className="features">
                        <li><span>✓</span> 10 messages per day</li>
                        <li><span>✓</span> Basic Message Builder</li>
                        <li><span>✓</span> 3-day history retention</li>
                        <li><span>✓</span> Standard support</li>
                    </ul>
                    <button className="pricing-btn outline" disabled>Current Plan</button>
                </div>

                <div className="pricing-card premium">
                    <div className="most-popular">Most Popular</div>
                    <div className="card-header">
                        <h2>Clarity Plus</h2>
                        <div className="price">$9<span>/month</span></div>
                        <p>Unlimited access to deeper wisdom.</p>
                    </div>
                    <ul className="features">
                        <li><span>✓</span> Unlimited messages</li>
                        <li><span>✓</span> Advanced Overthinking Clarifier</li>
                        <li><span>✓</span> Philosophical Reflections</li>
                        <li><span>✓</span> Permanent history storage</li>
                        <li><span>✓</span> Priority processing</li>
                    </ul>
                    <button className="pricing-btn primary">Upgrade to Plus</button>
                </div>
            </div>

            <div className="pricing-footer">
                <Link to="/" className="back-link">← Back to Untangle</Link>
            </div>
        </div>
    );
}

'use client'

import React from 'react'

export default function About() {
  return (
    <div className="min-h-screen about-wrap">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Hero / Intro */}
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-14 bg-layer text-charcoal shadow-[0_10px_30px_rgba(51,65,85,0.12)]">
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              About MyNunny
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              Connecting families with verified, reliable nannies across Kenya. We bring trust,
              simplicity, and transparency to home care.
            </p>
          </div>
          <div aria-hidden className="shape-blob blob-a" />
          <div aria-hidden className="shape-blob blob-b" />
        </div>

        {/* Content Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <section className="card">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              To create a safe, reliable, and efficient marketplace where clients can find
              qualified nannies and nannies can showcase their skills and find meaningful
              employment opportunities.
            </p>
            <div className="mt-6 grid gap-3">
              <div className="pill">Trust & Safety</div>
              <div className="pill">Local Discovery</div>
              <div className="pill">Transparent Pricing</div>
            </div>
          </section>

          <section className="card">
            <h2 className="section-title">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="sub-title">For Clients</h3>
                <ul className="list">
                  <li>Access to verified and approved nannies</li>
                  <li>Local providers in your county and constituency</li>
                  <li>Transparent pricing and clear descriptions</li>
                  <li>Direct communication with providers</li>
                  <li>Post service requests and get responses</li>
                </ul>
              </div>
              <div>
                <h3 className="sub-title">For Nunnies</h3>
                <ul className="list">
                  <li>Showcase your skills and experience</li>
                  <li>Find clients in your local area</li>
                  <li>Define your own service offerings</li>
                  <li>Build a strong professional reputation</li>
                  <li>Access to verified client requests</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Process */}
        <section className="card mt-8">
          <h2 className="section-title">Our Process</h2>
          <div className="space-y-5">
            <div className="step">
              <div className="step-badge">1</div>
              <div>
                <h3 className="sub-title">Registration & Verification</h3>
                <p className="section-text">All nunnies complete a thorough registration and admin verification.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-badge">2</div>
              <div>
                <h3 className="sub-title">Matching & Discovery</h3>
                <p className="section-text">Clients browse approved nunnies or post specific service requests.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-badge">3</div>
              <div>
                <h3 className="sub-title">Connection & Service</h3>
                <p className="section-text">Direct communication for details, pricing, and scheduling.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="card mt-8">
          <h2 className="section-title">Why Choose MyNunny?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="feature">
              <div className="feature-icon bg-aqua-soft">
                <svg className="w-8 h-8 text-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="sub-title">Verified Professionals</h3>
              <p className="muted">All nunnies are thoroughly vetted and approved by our admin team.</p>
            </div>
            <div className="feature">
              <div className="feature-icon bg-aqua-soft">
                <svg className="w-8 h-8 text-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="sub-title">Local Service</h3>
              <p className="muted">Find nannies in your specific county and constituency.</p>
            </div>
            <div className="feature">
              <div className="feature-icon bg-aqua-soft">
                <svg className="w-8 h-8 text-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="sub-title">Fair Pricing</h3>
              <p className="muted">Transparent pricing with no hidden fees or commissions.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 rounded-2xl p-8 text-center border border-[rgba(51,65,85,0.12)] bg-[rgba(250,248,243,0.8)] shadow-[0_8px_24px_rgba(51,65,85,0.08)]">
          <h3 className="text-2xl font-bold text-charcoal">Get Started Today</h3>
          <p className="muted mt-2 max-w-2xl mx-auto">
            Whether you're looking for a reliable nanny or want to offer your services, MyNunny is here
            to connect you with the right people.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register?role=client"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl text-charcoal font-semibold shadow-lg border border-[rgba(51,65,85,0.16)] bg-aqua hover:bg-aqua-dark transition-colors"
            >
              Find a Nunny
            </a>
            <a
              href="/register?role=nunny"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold shadow-lg border border-[rgba(51,65,85,0.16)] text-charcoal bg-cream hover:bg-cream-deep transition-colors"
            >
              Become a Nunny
            </a>
          </div>
        </section>
      </div>

      <style jsx>{`
        /* Palette */
        :global(:root) {
          --aqua: #2DD4BF;
          --charcoal: #334155;
          --cream: #FAF8F3;
        }
        .text-charcoal { color: var(--charcoal); }
        .bg-aqua { background-color: var(--aqua); }
        .bg-aqua-dark { background-color: #24bda9; }
        .bg-aqua-soft { background-color: rgba(45, 212, 191, 0.14); }
        .bg-cream { background-color: var(--cream); }
        .bg-cream-deep { background-color: #F2EEE6; }
        .text-aqua { color: var(--aqua); }
        .muted { color: rgba(51,65,85,0.8); }

        /* Page wrapper background */
        .about-wrap {
          background:
            radial-gradient(1000px 600px at -10% -10%, rgba(45, 212, 191, 0.18), rgba(45, 212, 191, 0) 60%),
            radial-gradient(800px 500px at 110% 10%, rgba(51, 65, 85, 0.10), rgba(51, 65, 85, 0) 65%),
            var(--cream);
        }

        /* Hero layered background */
        .bg-layer {
          background:
            radial-gradient(650px 380px at 20% -10%, rgba(45, 212, 191, 0.30), rgba(45, 212, 191, 0) 60%),
            radial-gradient(500px 320px at 85% 10%, rgba(51, 65, 85, 0.18), rgba(51, 65, 85, 0) 60%),
            linear-gradient(180deg, rgba(250, 248, 243, 0.9), rgba(250, 248, 243, 0.75));
        }

        /* Decorative blobs */
        .shape-blob {
          position: absolute;
          inset: auto;
          pointer-events: none;
          filter: blur(30px);
          opacity: 0.5;
        }
        .blob-a { width: 380px; height: 380px; right: -120px; top: -80px; background: rgba(45, 212, 191, 0.35); border-radius: 50%; }
        .blob-b { width: 280px; height: 280px; left: -90px; bottom: -100px; background: rgba(51, 65, 85, 0.25); border-radius: 50%; }

        /* Cards */
        .card {
          background: rgba(250, 248, 243, 0.85);
          border: 1px solid rgba(51, 65, 85, 0.12);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 8px 24px rgba(51, 65, 85, 0.08);
          backdrop-filter: saturate(120%) blur(2px);
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--charcoal);
          margin-bottom: 12px;
        }
        .sub-title {
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 6px;
        }
        .section-text { color: rgba(51, 65, 85, 0.9); }

        .list { color: rgba(51, 65, 85, 0.9); padding-left: 1rem; list-style: disc; }
        .list li { margin: 4px 0; }

        .pill {
          display: inline-block;
          width: fit-content;
          padding: 6px 12px;
          border-radius: 9999px;
          background: rgba(45, 212, 191, 0.14);
          color: var(--charcoal);
          border: 1px solid rgba(51, 65, 85, 0.12);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .step { display: flex; gap: 12px; align-items: flex-start; }
        .step-badge {
          flex-shrink: 0;
          width: 40px; height: 40px;
          border-radius: 12px;
          background: rgba(45, 212, 191, 0.18);
          color: var(--charcoal);
          display: grid; place-items: center;
          font-weight: 800;
          border: 1px solid rgba(51, 65, 85, 0.15);
        }

        .feature { text-align: center; }
        .feature-icon {
          width: 64px; height: 64px; border-radius: 16px;
          display: grid; place-items: center;
          border: 1px solid rgba(51,65,85,0.12);
          margin: 0 auto 12px auto;
        }
      `}</style>
    </div>
  )
}

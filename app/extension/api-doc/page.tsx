"use client";

import React, { useState, useEffect } from 'react';
import { BookOpen, Lock, AlertTriangle, ChevronRight, Copy, Check, ExternalLink, Menu, X } from 'lucide-react';

const ApiDocumentation = () => {
  const [activeSection, setActiveSection] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach((section) => {
        const element = section as HTMLElement;
        const sectionTop = element.offsetTop;

        if (window.scrollY >= sectionTop - 200) {
          current = element.getAttribute('id') || '';
        }
      });

      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    {
      title: 'API Documentation',
      icon: BookOpen,
      items: [
        { id: 'P1', label: '1. Create Your Account' },
        { id: 'P2', label: '2. Sign In to Tauzand.in' },
        { id: 'P3', label: '3. Beta Account Creation' },
        {
          id: 'P4',
          label: '4. Generate API Key',
          subitems: [
            { id: 'P4p1', label: 'Regenerate API Key' },
            { id: 'P4p2', label: 'Download Extension' },
            { id: 'P4p3', label: 'Paste API Key' },
          ],
        },
        {
          id: 'P5',
          label: '5. Install in Chrome',
          subitems: [
            { id: 'P5p1', label: 'Load Extension' },
            { id: 'P5p2', label: 'Refresh & Allow Access' },
            { id: 'P5p3', label: 'Grant Permissions' },
          ],
        },
        {
          id: 'P6',
          label: '6. How to Use',
          subitems: [
            { id: 'P6p1', label: 'Extension Location' },
            { id: 'P6p2', label: 'Copy Questions' },
            { id: 'P6p3', label: 'Show/Hide Extension' },
          ],
        },
      ],
    },
    {
      title: 'Privacy Policy',
      icon: Lock,
      items: [{ id: 'privacy', label: 'Read Policy' }],
    },
    {
      title: 'Disclaimer',
      icon: AlertTriangle,
      items: [{ id: 'disclaimer', label: 'Read Disclaimer' }],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <header className="mb-12 pb-8 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Extension Documentation | <span className='bg-yellow-300 p-2 rotate-1 rounded-md'><a href="www.Tauzand.in">Tauzand.in</a></span>
                </h1>
              </div>
              <p className="text-base text-gray-600 ml-13">
                Integration Guide, Privacy & Usage Guidelines
              </p>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside
            className={`lg:col-span-1 ${
              mobileMenuOpen ? 'block' : 'hidden'
            } lg:block`}
          >
            <nav className="sticky top-8 space-y-6">
              {navItems.map((section, idx) => {
                const Icon = section.icon;
                return (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <h2 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-900">
                      <Icon className="w-4 h-4 text-blue-600" />
                      {section.title}
                    </h2>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => scrollToSection(item.id)}
                            className={`w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${
                              activeSection === item.id
                                ? 'bg-blue-600 text-white font-medium'
                                : 'text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <span className="flex items-center justify-between">
                              {item.label}
                              {activeSection === item.id && (
                                <ChevronRight className="w-3 h-3" />
                              )}
                            </span>
                          </button>
                          {'subitems' in item && item.subitems && (
                            <ul className="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
                              {item.subitems.map((subitem) => (
                                <li key={subitem.id}>
                                  <button
                                    onClick={() => scrollToSection(subitem.id)}
                                    className={`w-full text-left text-xs px-2 py-1.5 rounded transition-colors ${
                                      activeSection === subitem.id
                                        ? 'text-blue-600 font-medium'
                                        : 'text-gray-600 hover:text-blue-600'
                                    }`}
                                  >
                                    {subitem.label}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            {/* API Documentation Section */}
            <section className="border border-gray-200 rounded-lg bg-white p-8">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">API Documentation</h2>
              </div>

              <div className="space-y-12">
                {/* Step 1 */}
                <div id="P1" className="scroll-mt-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Your Account</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Start by creating a free account on Tauzand.in. This will give you access to our beta features, including the Chrome extension and API integration. The signup process is simple and takes less than a minute to complete. You only need basic details like your name, email address, and password. Once registered, your account becomes your central access point to all current and upcoming features, allowing you to manage your profile, extension access, and integration settings securely.
                      </p>
                      <a
                        href="https://www.Tauzand.in/sign-up"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                      >
                        Create Account
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div id="P2" className="scroll-mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Sign In to Tauzand.in</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Once your account is created, sign in using your credentials. This step verifies your identity and prepares your dashboard. After logging in, the system securely connects your account with the extension services and enables personalized functionality. Your dashboard will load automatically, where you can access extension instructions, manage settings, and monitor your usage.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div id="P3" className="scroll-mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Beta Account Creation</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Upon signing in, your beta account for the Chrome extension is automatically created. You'll be redirected to your personalized dashboard. This process happens instantly in the background without requiring any manual setup from your side. Your beta access enables exclusive features, early updates, and integration capabilities not available to regular users.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div id="P4" className="scroll-mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate API Key</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        Your API Key is generated and displayed on the dashboard immediately after account creation. This key acts as your unique authentication token that securely connects your extension with your Tauzand account. It ensures that all requests made through the extension are properly authorized and linked to your profile.
                      </p>

                      {/* Code block */}
                      <div className="bg-gray-900 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono text-gray-400">Example API Key</span>
                          <button
                            onClick={() => copyToClipboard('vf_1234567890abcdef', 'apikey')}
                            className="p-1.5 rounded hover:bg-gray-800 transition-colors"
                            aria-label="Copy API key"
                          >
                            {copiedCode === 'apikey' ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                        <code className="text-sm font-mono text-green-400">vf_1234567890abcdef...</code>
                      </div>

                      {/* Subsections */}
                      <div className="space-y-6 pl-6 border-l-2 border-gray-300">
                        <div id="P4p1" className="scroll-mt-8">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Regenerate API Key</h4>
                          <p className="text-gray-700 leading-relaxed">
                            You can regenerate your API key at any time from the dashboard if needed. This is useful if your existing key becomes compromised, exposed, or stops working correctly. Regenerating the key will instantly deactivate the previous one and issue a new secure key.
                          </p>
                        </div>

                        <div id="P4p2" className="scroll-mt-8">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Download Extension</h4>
                          <p className="text-gray-700 leading-relaxed">
                            Manually download the extension from the provided folder in your dashboard. This folder contains all the necessary files required for installation and proper functionality. Make sure you extract the folder completely and keep it in a safe location on your computer.
                          </p>
                        </div>

                        <div id="P4p3" className="scroll-mt-8">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Paste API Key</h4>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Open the content.js file in the downloaded extension and paste your API key. This step connects your local extension with your Tauzand account and enables all personalized features.
                          </p>
                          <div className="bg-gray-900 rounded-lg p-4">
                            <code className="text-sm font-mono text-gray-300">
                              <span className="text-gray-500">// content.js</span><br />
                              <span className="text-blue-400">const</span> <span className="text-white">API_KEY</span> = <span className="text-green-400">'YOUR_API_KEY_HERE'</span>;
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div id="P5" className="scroll-mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Install in Chrome</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        Open Google Chrome and follow these steps to install the extension. This process allows Chrome to recognize and activate your custom extension locally. Installing it correctly ensures the extension runs smoothly and integrates with supported websites.
                      </p>

                      <div className="space-y-6 pl-6 border-l-2 border-gray-300">
                        <div id="P5p1" className="scroll-mt-8">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Load Extension</h4>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Go to the developer options, select "Load unpacked," and choose the extension folder. Make sure you select the correct extracted folder that contains the manifest.json file.
                          </p>
                          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                            <p className="text-sm text-gray-700 font-medium mb-2">Quick Path:</p>
                            <code className="text-xs font-mono text-gray-600">
                              chrome://extensions → Enable Developer Mode → Load unpacked
                            </code>
                          </div>
                        </div>

                        <div id="P5p2" className="scroll-mt-8">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Refresh & Allow Access</h4>
                          <p className="text-gray-700 leading-relaxed">
                            Refresh the browser and allow access to the extension. This ensures Chrome properly initializes the extension and applies all required configurations. After refreshing, check that the extension icon is visible and active.
                          </p>
                        </div>

                        <div id="P5p3" className="scroll-mt-8">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Grant Permissions</h4>
                          <p className="text-gray-700 leading-relaxed">
                            On any site you use it, grant the necessary permissions when prompted. These permissions allow the extension to access and enhance specific page features required for functionality.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div id="P6" className="scroll-mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                      6
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Use</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        The extension is now ready. Here's how to interact with it. Once installed and activated, the extension will automatically run in the background while you browse supported websites.
                      </p>

                      <div className="space-y-6 pl-6 border-l-2 border-gray-300">
                        <div id="P6p1" className="scroll-mt-8">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Extension Location</h4>
                          <p className="text-gray-700 leading-relaxed">
                            The Chrome extension will appear at the lower right side of your desktop/laptop view. This floating interface ensures it remains accessible without blocking your main content.
                          </p>
                        </div>

                        <div id="P6p2" className="scroll-mt-8">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Copy Questions</h4>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            To copy any question, drag your mouse to select it and press the keyboard shortcut. The extension will show the answer instantly.
                          </p>
                          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                            <p className="text-sm text-gray-700 font-medium mb-2">Keyboard Shortcut:</p>
                            <div className="flex items-center gap-2">
                              <kbd className="px-3 py-1.5 bg-white border border-gray-400 rounded font-mono text-sm">Ctrl</kbd>
                              <span className="text-gray-600">+</span>
                              <kbd className="px-3 py-1.5 bg-white border border-gray-400 rounded font-mono text-sm">Q</kbd>
                            </div>
                          </div>
                        </div>

                        <div id="P6p3" className="scroll-mt-8">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Show/Hide Extension</h4>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Control the visibility of the extension with these shortcuts:
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-gray-50 border border-gray-300 rounded-lg p-3">
                              <p className="text-xs text-gray-600 mb-2 font-medium">Hide Extension</p>
                              <div className="flex items-center gap-2">
                                <kbd className="px-2 py-1 bg-white border border-gray-400 rounded text-xs font-mono">Tab</kbd>
                                <span className="text-gray-500">+</span>
                                <kbd className="px-2 py-1 bg-white border border-gray-400 rounded text-xs font-mono">-</kbd>
                              </div>
                            </div>
                            <div className="bg-gray-50 border border-gray-300 rounded-lg p-3">
                              <p className="text-xs text-gray-600 mb-2 font-medium">Show Extension</p>
                              <div className="flex items-center gap-2">
                                <kbd className="px-2 py-1 bg-white border border-gray-400 rounded text-xs font-mono">Tab</kbd>
                                <span className="text-gray-500">+</span>
                                <kbd className="px-2 py-1 bg-white border border-gray-400 rounded text-xs font-mono">+</kbd>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy Policy */}
            <section
              id="privacy"
              className="border border-gray-200 rounded-lg bg-white p-8 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
                <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Privacy Policy</h2>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  At Tauzand, we are committed to protecting your privacy and maintaining the confidentiality of your personal information. This Privacy Policy formally explains what data we collect, why we collect it, and how we protect it. By using our platform, extension, or API services, you acknowledge and agree to the practices described herein.
                </p>

                <div className="border-l-4 border-gray-700 bg-gray-50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Collection by the Company</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The Company formally collects limited and necessary information including, but not limited to, your registered email address, account identifiers, extension usage activity, and API interaction logs. Such collection is conducted solely for operational, analytical, and security purposes.
                  </p>
                </div>

                <div className="border-l-4 border-blue-600 bg-gray-50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Use by the Company</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The Company formally uses collected data strictly for providing, maintaining, and improving its services. This includes enabling personalized functionality, ensuring secure authentication, preventing unauthorized access, and maintaining system integrity. The Company explicitly affirms that it does not sell, rent, or trade user personal information to any third party.
                  </p>
                </div>

                <div className="border-l-4 border-gray-700 bg-gray-50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">User Responsibilities</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Users are formally responsible for maintaining the confidentiality and security of their account credentials and API keys. You must not share, distribute, or expose your API key to unauthorized individuals or public platforms. Any activity performed using your credentials will be considered your responsibility.
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <section
              id="disclaimer"
              className="border border-gray-200 rounded-lg bg-white p-8 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
                <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Disclaimer</h2>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Tauzand formally provides this extension, platform, and API services on an "as-is" and "as-available" basis without any express or implied warranties of any kind. The Company does not guarantee uninterrupted availability, complete accuracy, or error-free operation of its services.
                </p>

                <div className="border-l-4 border-gray-700 bg-gray-50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Use of Data</h3>
                  <p className="text-gray-700 leading-relaxed">
                    By accessing or using Tauzand services, you formally acknowledge and agree that the Company may collect, store, and process certain data in accordance with the stated Privacy Policy. You further agree that you are solely responsible for ensuring your use of the extension and API complies with all applicable local, national, and international laws, regulations, and institutional policies.
                  </p>
                </div>

                <div className="border-l-4 border-blue-600 bg-gray-50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Limitations</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To the fullest extent permitted by applicable law, the Company formally disclaims any and all liability for direct, indirect, incidental, consequential, or special damages arising from or related to your use, misuse, or inability to use the extension, platform, or API services. Users assume full responsibility for their usage decisions.
                  </p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="border border-gray-200 rounded-lg bg-gray-50 p-6 text-center">
              <p className="text-sm text-gray-600 mb-1">Last updated</p>
              <p className="text-base font-semibold text-gray-900">February 18, 2026</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ApiDocumentation;
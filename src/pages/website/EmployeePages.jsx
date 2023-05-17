/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, lazy, Suspense } from 'react';

import PublicNavbar from '../../components/websites/PublicNavbar';
import PublicFooter from '../../components/websites/PublicFooter';

const Employee = lazy(() => import('../../components/websites/karyawan/Employee'));
const ExternalEmployee = lazy(() => import('../../components/websites/karyawan/ExternalEmployee'));

const EmployeePages = () => {
    const [activeTab, setActiveTab] = useState('Internal');

    return (
        <React.Fragment>
            <PublicNavbar />
            <div style={{ background: 'linear-gradient(to bottom, #b4e5f9 2%, #ffffff 65%)', backgroundSize: `cover`, backgroundPosition: `center`, paddingTop: '100px'  }}>
                <div className="container pb-6">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><a href="/">Beranda</a></li>
                            <li className="is-active"><a href="#">Tenaga Kerja</a></li>
                        </ul>
                    </nav>
                    <div className="tabs is-small is-boxed">
                        <ul>
                            <li
                                className={activeTab === 'Internal' ? 'is-active' : ''}
                                onClick={() => setActiveTab('Internal')}
                            >
                                <a>Internal</a>
                            </li>
                            <li
                                className={activeTab === 'Eksternal' ? 'is-active' : ''}
                                onClick={() => setActiveTab('Eksternal')}
                            >
                                <a>External</a>
                            </li>
                        </ul>
                    </div>
                    <Suspense fallback={<h2 className='subtitle is-5'>Loading...</h2>}>
                        {activeTab === 'Internal' && <Employee />}
                        {activeTab === 'Eksternal' && <ExternalEmployee />}
                    </Suspense>
                </div>
            </div>
            <PublicFooter />
        </React.Fragment>
    );
};

export default EmployeePages;

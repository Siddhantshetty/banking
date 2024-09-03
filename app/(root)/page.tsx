import RightSidebar from '@/components/RightSidebar';
import HeaderBox from '@/components/ui/HeaderBox'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';


const Home = () => {
    const loggedIn = { firstName: 'Siddhant', lastName: 'Shetty', email: 'Siddhant.shetty1811@gmail.com' };

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Access and manage your account and transactions effeciently."
                    />
                    <TotalBalanceBox
                        accounts={[]}
                        totalbanks={1}
                        totalCurrentBalance={1250.35}
                    />
                </header>

                <h2>RECENT TRANSACTIONS</h2>
            </div>

            <RightSidebar
                user={loggedIn}
                transactions={[]}
                banks={[{ currentBalance: 123.50 }, { currentBalance: 500.50 }]}
            />
        </section>

    )
}

export default Home
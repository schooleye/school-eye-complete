import React from 'react';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import BarChart from '../components/BarChart';
import PieChart from '../components/Pie';
import { useGlobalContext } from '../context/appContext';
import { BsInfoLg } from 'react-icons/bs';
import { MdSchool } from 'react-icons/md';
import schoolLogo from '../assets/school-logo.png';
import { useNavigate, Link } from 'react-router-dom';
const MinDashboard = () => {
  const {
    filteredSchools,
    user,
    authenticateSuperUser,
    getAllUsers,
    Schools,
    isLoading,
  } = useGlobalContext();
  const findAverage = (arr) => {
    const avg = arr.reduce((sum, curr) => sum + Number(curr), 0) / arr.length;
    return avg;
  };
  // REGION CALCULATIONS
  const centralSchools = Schools.filter(
    (school) => school.region === 'central'
  );
  const centralCoverages = [...centralSchools.map((school) => school.coverage)];
  const centralAverageCoverage = findAverage(centralCoverages);
  const northernSchools = Schools.filter(
    (school) => school.region === 'northern'
  );
  const northernCoverages = [
    ...northernSchools.map((school) => school.coverage),
  ];
  const northernAverageCoverage = findAverage(northernCoverages);

  const easternSchools = Schools.filter(
    (school) => school.region === 'eastern'
  );
  const easternCoverages = [...easternSchools.map((school) => school.coverage)];
  const easternAverageCoverage = findAverage(easternCoverages);

  const westernSchools = Schools.filter(
    (school) => school.region === 'western'
  );
  const westernCoverages = [...westernSchools.map((school) => school.coverage)];
  const westernAverageCoverage = findAverage(westernCoverages);
  // NUMBER OF SCHOOLS UNDER COVERAGE CALCULATION
  const redPercentage = Schools.filter((school) => school.coverage <= 25);
  const bluePercentage = Schools.filter((school) => school.coverage <= 50);
  const orangePercentage = Schools.filter((school) => school.coverage <= 75);
  const greenPercentage = Schools.filter((school) => school.coverage <= 100);
  // SINGLE SUBJECT CALCULATION
  const allMathCoverage = Schools.map((school) => school.math);
  const allPhysicsCoverage = Schools.map((school) => school.physics);
  const allChemistryCoverage = Schools.map((school) => school.chemistry);
  const getLevelCount = (arr, level) => {
    const levelArr = arr.filter((thisLevel) => thisLevel === level);
    return levelArr.length;
  };
 
  // MATH COUNTS
  const math25 = getLevelCount(allMathCoverage, 25);
  const math50 = getLevelCount(allMathCoverage, 50);
  const math75 = getLevelCount(allMathCoverage, 75);
  const math100 = getLevelCount(allMathCoverage, 100);
  // PHYSICS COUNTS
  const physics25 = getLevelCount(allPhysicsCoverage, 25);
  const physics50 = getLevelCount(allPhysicsCoverage, 50);
  const physics75 = getLevelCount(allPhysicsCoverage, 75);
  const physics100 = getLevelCount(allPhysicsCoverage, 100);
  // CHEMISTRY COUNTS
  const chemistry25 = getLevelCount(allChemistryCoverage, 25);
  const chemistry50 = getLevelCount(allChemistryCoverage, 50);
  const chemistry75 = getLevelCount(allChemistryCoverage, 75);
  const chemistry100 = getLevelCount(allChemistryCoverage, 100);
  // console.log(math25, math50, math75, math100);
  const navigate = useNavigate();
  useEffect(() => {
    getAllUsers();
  }, []);
  const returnTrueFalse = (isLoading) => {
    if (isLoading) {
      return 'Fetching...';
    } else {
      return 'no schools matched your search';
    }
  };
  const displayAverageColor = (number) => {
    if (number <= 25) {
      return '#8b0000';
    } else if (number <= 50) {
      return '#00008b';
    } else if (number <= 75) {
      return '#ff8c00';
    } else {
      return '#00ff00';
    }
  };
  return (
    <>
      {user && authenticateSuperUser(user, navigate)}
      <NavBar />
      <SearchBar />
      <div className='center-div'>
        <h3>
          {filteredSchools.length < 1 ? returnTrueFalse(isLoading) : 'schools'}
        </h3>
      </div>
      <section className='schools-container'>
        {filteredSchools.map((school, index) => {
          const { name, region } = school;
          return (
            <Link key={index} to={`/super/${name}`} className='link-color'>
              <article className='single-school'>
                <div className='img-container'>
                  <MdSchool className='school-logo' />
                </div>
                <div className='school-contact'>
                  <p>{name}</p>
                  <p>Region: {region}</p>
                </div>
              </article>
            </Link>
          );
        })}
      </section>
      <section>
        <div className='center-div'>
          <h3>graphical analysis</h3>
        </div>
        <article className='chart-container-ministry'>
          <div className='single-chart'>
            <BarChart
              pieTitle='Average Coverage per Region'
              myLabels={{ y: '% Coverage', x: 'Region' }}
              chartData={{
                labels: ['Central', 'Eastern', 'Western', 'Northern'],

                datasets: [
                  {
                    label: 'Percentege Coverage',
                    data: [
                      centralAverageCoverage,
                      easternAverageCoverage,
                      westernAverageCoverage,
                      northernAverageCoverage,
                    ],

                    backgroundColor: [
                      displayAverageColor(centralAverageCoverage),
                      displayAverageColor(easternAverageCoverage),
                      displayAverageColor(westernAverageCoverage),
                      displayAverageColor(northernAverageCoverage),
                    ],
                    borderWidth: 0,
                  },
                ],
              }}
            />
          </div>
          <div className='single-chart'>
            <BarChart
              pieTitle='Count of Schools per Level'
              myLabels={{ y: 'School Count', x: 'Level' }}
              chartData={{
                labels: ['25%', '50%', '75%', '100%'],

                datasets: [
                  {
                    label: 'Count of Schools',
                    data: [
                      redPercentage.length,
                      bluePercentage.length,
                      orangePercentage.length,
                      greenPercentage.length,
                    ],

                    backgroundColor: [
                      '#8b0000',
                      '#00008b',
                      '#ff8c00',
                      '#00ff00',
                    ],
                    borderWidth: 0,
                  },
                ],
              }}
            />
          </div>
          <div className='single-chart'>
            <BarChart
              pieTitle='Mathematics table'
              myLabels={{ y: 'count', x: 'percentage' }}
              chartData={{
                labels: ['25%', '50%', '75%', '100%'],

                datasets: [
                  {
                    label: 'Number of Schools',
                    data: [math25, math50, math75, math100],

                    backgroundColor: [
                      '#8b0000',
                      '#00008b',
                      '#ff8c00',
                      '#00ff00',
                    ],
                    borderWidth: 0,
                  },
                ],
              }}
            />
          </div>
          <div className='single-chart'>
            <BarChart
              pieTitle='Physics table'
              myLabels={{ y: 'count', x: 'percentage' }}
              chartData={{
                labels: ['25%', '50%', '75%', '100%'],

                datasets: [
                  {
                    label: 'Number of Schools',
                    data: [physics25, physics50, physics75, physics100],

                    backgroundColor: [
                      '#8b0000',
                      '#00008b',
                      '#ff8c00',
                      '#00ff00',
                    ],
                    borderWidth: 0,
                  },
                ],
              }}
            />
          </div>
          <div className='single-chart'>
            <BarChart
              pieTitle='Chemistry table'
              myLabels={{ y: 'count', x: 'percentage' }}
              chartData={{
                labels: ['25%', '50%', '75%', '100%'],

                datasets: [
                  {
                    label: 'Number of Schools',
                    data: [chemistry25, chemistry50, chemistry75, chemistry100],

                    backgroundColor: [
                      '#8b0000',
                      '#00008b',
                      '#ff8c00',
                      '#00ff00',
                    ],
                    borderWidth: 0,
                  },
                ],
              }}
            />
          </div>
        </article>
      </section>
    </>
  );
};

export default MinDashboard;

// pages/homepage.tsx
"use client";
import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="p-4">
      <div style={{ position: 'relative', width: '100%', height: '650px' }}>
        <img
          src="/imgs/csBackground.png"
          alt="CoffeeSpot Header"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
        <img
          src="/imgs/coffeeSpotLogo.png"
          alt="CoffeeSpot Logo"
          className="mb-4"
          style={{
            position: 'absolute',
            top: '400px',
            left: '1500px',
            width: '350px',
            height: '250px',
            objectFit: 'cover',
            objectPosition: 'right'
          }}
        />
      </div>
      <div className="p-4">
        <img
          src="/imgs/featuredSpotsimg.png"
          alt="FeaturedSpotsLogo"
          style={{
            position: 'relative',
            width: '400px',
            height: '100%',
            left: '30px'
          }}
        />
      </div>
      <div className="rectangles" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        marginTop: '20px',
        justifyItems: 'center', // Center horizontally
        alignItems: 'center' // Center vertically
      }}>
        <div
          className="rectangle"
          style={{
            width: '100%',
            maxWidth: '750px',
            height: '218px',
            background: '#FFE7EC',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            position: 'relative' // Ensure the grey square is positioned relative to the rectangle
          }}
        >
          <h1 style={{
            position: 'relative',
            top: '35px',
            left: '235px',
            fontSize: '24px',

          }}>Location Name</h1>
          <div
            style={{
              position: 'absolute',
              top: '35px',
              left: '35px',
              width: '150px',
              height: 'calc(100% - 70px)',
              backgroundColor: 'grey'
            }}
          />
        </div>
        <div
          className="rectangle"
          style={{
            width: '100%',
            maxWidth: '750px',
            height: '218px',
            background: '#D1DAAF',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            position: 'relative' // Ensure the grey square is positioned relative to the rectangle
          }}
        >
          <h1 style={{
            position: 'relative',
            top: '35px',
            left: '235px',
            fontSize: '24px',

          }}>Location Name</h1>
          <div
            style={{
              position: 'absolute',
              top: '35px',
              left: '35px',
              width: '150px',
              height: 'calc(100% - 70px)',
              backgroundColor: 'grey'
            }}
          />
        </div>
        <div
          className="rectangle"
          style={{
            width: '100%',
            maxWidth: '750px',
            height: '218px',
            background: '#D1DAAF',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            position: 'relative', // Ensure the grey square is positioned relative to the rectangle
            padding: '10px' // Add padding to the grey square
          }}
        >
          <h1 style={{
            position: 'relative',
            top: '35px',
            left: '235px',
            fontSize: '24px',

          }}>Location Name</h1>
          <div
            style={{
              position: 'absolute',
              top: '35px',
              left: '35px',
              width: '150px',
              height: 'calc(100% - 70px)',
              backgroundColor: 'grey',

            }}
          />
        </div>
        <div
          className="rectangle"
          style={{
            width: '100%',
            maxWidth: '750px',
            height: '218px',
            background: '#FFE7EC',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            position: 'relative' // Ensure the grey square is positioned relative to the rectangle
          }}

        >
          <h1 style={{
            position: 'relative',
            top: '35px',
            left: '235px',
            fontSize: '24px',

          }}>Location Name</h1>
          <div
            style={{
              position: 'absolute',
              top: '35px',
              left: '35px',
              width: '150px',
              height: 'calc(100% - 70px)',
              backgroundColor: 'grey'
            }}
          />
        </div>
        <div
          className="rectangle"
          style={{
            width: '100%',
            maxWidth: '750px',
            height: '218px',
            background: '#FFE7EC',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            position: 'relative' // Ensure the grey square is positioned relative to the rectangle
          }}
        >
          <h1 style={{
            position: 'relative',
            top: '35px',
            left: '235px',
            fontSize: '24px',

          }}>Location Name</h1>
          <div
            style={{
              position: 'absolute',
              top: '35px',
              left: '35px',
              width: '150px',
              height: 'calc(100% - 70px)',
              backgroundColor: 'grey'
            }}
          />
        </div>
        <div
          className="rectangle"
          style={{
            width: '100%',
            maxWidth: '750px',
            height: '218px',
            background: '#D1DAAF',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            position: 'relative' // Ensure the grey square is positioned relative to the rectangle
          }}
        >
          <h1 style={{
            position: 'relative',
            top: '35px',
            left: '235px',
            fontSize: '24px',

          }}>Location Name</h1>
          <div
            style={{
              position: 'absolute',
              top: '35px',
              left: '35px',
              width: '150px',
              height: 'calc(100% - 70px)',
              backgroundColor: 'grey'
            }}
          />
        </div>
        <div
          className="rectangle"
          style={{
            width: '100%',
            maxWidth: '750px',
            height: '218px',
            background: '#D1DAAF',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            position: 'relative', // Ensure the grey square is positioned relative to the rectangle
            padding: '10px' // Add padding to the grey square
          }}
        >
          <h1 style={{
            position: 'relative',
            top: '35px',
            left: '235px',
            fontSize: '24px',

          }}>Location Name</h1>
          <div
            style={{
              position: 'absolute',
              top: '35px',
              left: '35px',
              width: '150px',
              height: 'calc(100% - 70px)',
              backgroundColor: 'grey',

            }}
          />
        </div>
        <div
          className="rectangle"
          style={{
            width: '100%',
            maxWidth: '750px',
            height: '218px',
            background: '#FFE7EC',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            position: 'relative' // Ensure the grey square is positioned relative to the rectangle
          }}

        >
          <h1 style={{
            position: 'relative',
            top: '35px',
            left: '235px',
            fontSize: '24px',

          }}>Location Name</h1>
          <div
            style={{
              position: 'absolute',
              top: '35px',
              left: '35px',
              width: '150px',
              height: 'calc(100% - 70px)',
              backgroundColor: 'grey'
            }}
          />
        </div>
        <div
          className="rectangle"
          style={{
            width: '100%',
            maxWidth: '750px',
            height: '218px',
            background: '#FFE7EC',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            position: 'relative' // Ensure the grey square is positioned relative to the rectangle
          }}
        >
          <h1 style={{
            position: 'relative',
            top: '35px',
            left: '235px',
            fontSize: '24px',

          }}>Location Name</h1>
          <div
            style={{
              position: 'absolute',
              top: '35px',
              left: '35px',
              width: '150px',
              height: 'calc(100% - 70px)',
              backgroundColor: 'grey'
            }}
          />
        </div>
        <div
          className="rectangle"
          style={{
            width: '100%',
            maxWidth: '750px',
            height: '218px',
            background: '#D1DAAF',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            position: 'relative' // Ensure the grey square is positioned relative to the rectangle
          }}
        >
          <h1 style={{
            position: 'relative',
            top: '35px',
            left: '235px',
            fontSize: '24px',

          }}>Location Name</h1>
          <div
            style={{
              position: 'absolute',
              top: '35px',
              left: '35px',
              width: '150px',
              height: 'calc(100% - 70px)',
              backgroundColor: 'grey'
            }}
          />
        </div>
        <div
          className="rectangle"
          style={{
            width: '100%',
            maxWidth: '750px',
            height: '218px',
            background: '#D1DAAF',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            position: 'relative', // Ensure the grey square is positioned relative to the rectangle
            padding: '10px' // Add padding to the grey square
          }}
        >
          <h1 style={{
            position: 'relative',
            top: '35px',
            left: '235px',
            fontSize: '24px',

          }}>Location Name</h1>
          <div
            style={{
              position: 'absolute',
              top: '35px',
              left: '35px',
              width: '150px',
              height: 'calc(100% - 70px)',
              backgroundColor: 'grey',

            }}
          />
        </div>
        <div
          className="rectangle"
          style={{
            width: '100%',
            maxWidth: '750px',
            height: '218px',
            background: '#FFE7EC',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            position: 'relative' // Ensure the grey square is positioned relative to the rectangle
          }}

        >
          <h1 style={{
            position: 'relative',
            top: '35px',
            left: '235px',
            fontSize: '24px',

          }}>Location Name</h1>
          <div
            style={{
              position: 'absolute',
              top: '35px',
              left: '35px',
              width: '150px',
              height: 'calc(100% - 70px)',
              backgroundColor: 'grey'
            }}
          />
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;
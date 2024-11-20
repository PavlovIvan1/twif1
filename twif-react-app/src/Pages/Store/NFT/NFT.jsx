import {useEffect, useState} from 'react';
import styles from './NFT.module.scss';

import 'swiper/css';
import {Swiper, SwiperSlide} from 'swiper/react';
import {API_URL} from '../../../config.js';

export function Carousel() {

	const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/nft/collection`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const data = await response.json();
        setNftData(data.items);
      } catch (error) {
        console.error("Err", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div></div>;
  }

	return (
		<Swiper
      spaceBetween={50}
      slidesPerView={2}
      onSlideChange={() => console.log('slide change')}
    >
      {nftData.map(item => (
        <SwiperSlide key={item.address}>
          <div className={styles.Slider__component}>
            <img src={item.image} width={150} alt={item.name} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
		// <Swiper
    //   spaceBetween={50}
    //   slidesPerView={2}
    //   onSlideChange={() => console.log('slide change')}
    //   onSwiper={(swiper) => console.log(swiper)}
    // >
    //   <SwiperSlide>
		// 		<div className={styles.Slider__component}>
		// 				<img src="/2.svg" alt="" />
		// 		</div>
		// 	</SwiperSlide>
		// 	<SwiperSlide>
		// 		<div className={styles.Slider__component}>
		// 				<img src="/2.svg" alt="" />
		// 		</div>
		// 	</SwiperSlide>
		// 	<SwiperSlide>
		// 		<div className={styles.Slider__component}>
		// 				<img src="/2.svg" alt="" />
		// 		</div>
		// 	</SwiperSlide>
		// 	<SwiperSlide>
		// 		<div className={styles.Slider__component}>
		// 				<img src="/2.svg" alt="" />
		// 		</div>
		// 	</SwiperSlide>
    // </Swiper>
	)
}


export function NFT() {
	return (
		<>
		<div className={styles.nft}>
			<div className={styles.NFT}>
				<div className={styles.NFT__title}><h3>NFT</h3></div>
				<Carousel />
			</div>
		</div>
		</>
	)
}
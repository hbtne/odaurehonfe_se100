

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import styles from './chooseRouteChange.module.css';
import CarDriver from '../../../assets/img/carDriver.svg';
import IOSSwitch from '../../../components/switch.jsx';
import SwapIcon from '../../../assets/icons/swap-icon.js';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate, useParams } from 'react-router-dom';
const ChooseRouteChange = () => {
    const [selectedDeparture, setSelectedDeparture] = useState(null);
const [selectedReturn, setSelectedReturn] = useState(null);
    const [checked, setChecked] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { ticketId } = useParams();  
    const [searchParams, setSearchParams] = useState({
        ticketId : ticketId,
        departPlace: '',
        arrivalPlace: '',
        departureDate: '',

    });
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

        useEffect(() => {
        const fetchSchedules = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5278/api/bookticket/bus-bus-routes-with-ticket-price/${ticketId}`);
                console.log(response.data);

                const data = response.data.map(route => {
                    const buses = route.bus ? [route.bus] : [{ seatsAvailable: 0, pricePerSeat: 0 }];
                    
                    return buses.map(bus => ({
                        routeName: `${route.departPlace} - ${route.arrivalPlace}`,
                        departureTime: formatTime(route.departureTime),
                        duration: route.duration, 
                        arrivalTime: calculateArrivalTime(route.departureTime, route.duration),
                        seatsAvailable: route.seatsAvailable,
                        price: route.pricePerSeat,
                        plateNum: bus.plateNum,
                        busType: bus.type,
                        busBusRouteID: route.busBusRouteID,
                    }));
                }).flat();

                setSchedules(data);  
            } catch (error) {
                setError('Không thể tải lịch trình. Vui lòng thử lại sau.');
                console.error('Error fetching schedules:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedules();
    }, [ticketId]);

    

    const calculateArrivalTime = (departureTime, duration) => {
        if (typeof duration !== 'string') {
            console.error('Duration is not a string:', duration);
            return '';
        }

        const departureDate = new Date(departureTime);
        const [durHours, durMinutes] = duration.split(':').map(Number);
        departureDate.setHours(departureDate.getHours() + durHours);
        departureDate.setMinutes(departureDate.getMinutes() + durMinutes);

        return departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatTime = (time) => {
        const date = new Date(time);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
     const handleSelectBus = async (busBusRouteID) => {
        try {
            console.log(busBusRouteID);
            const response = await axios.post(`http://localhost:5278/change-ticket-request/${ticketId}/${busBusRouteID}`);

            if (response.status === 200) {
                alert('Gửi yêu cầu thành công');              
            }
        } catch (error) {
            console.error('Error selecting bus:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };
    

    const handleSearch = async () => {
        let formattedDepartureDate = searchParams.departureDate || null; 
      
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5278/api/bookticket/search_for_change', {
                params: {
                    ticketId : ticketId,
                    departPlace: searchParams.departPlace,
                    arrivalPlace: searchParams.arrivalPlace,
                    departureDate: formattedDepartureDate,
                },
            });
            console.log(formattedDepartureDate);
            console.log(response.data);
            
            const data = response.data.map(route => {
                const buses = route.bus ? [route.bus] : [{ seatsAvailable: 0, pricePerSeat: 0 }];
                
                return buses.map(bus => ({
                    routeName: `${route.departPlace} - ${route.arrivalPlace}`,
                    departureTime: formatTime(route.departureTime),
                    duration: route.duration, 
                    arrivalTime: calculateArrivalTime(route.departureTime, route.duration),
                    seatsAvailable: route.seatsAvailable,
                    price: route.pricePerSeat,
                    plateNum: bus.plateNum,
                    busType: bus.type,
                    busBusRouteID: route.busBusRouteID,
                }));
            }).flat();
            
            setSchedules(data);
            console.log('Schedules:', schedules);
    
        } catch (error) {
            setError('Không thể tìm thấy chuyến xe phù hợp. Vui lòng thử lại.');
            console.error('Error searching schedules:', error);
        } finally {
            setLoading(false);
        }
    };
    const formatDuration = (duration) => {
        if (!duration) return '';
        const [hours, minutes] = duration.split(':');
        return `${hours} giờ ${minutes} phút`;
    };
    
    return (
        <div className={styles.container}>
            <Box className={styles.linear} />
            <img src={CarDriver} alt="standing guy" className={styles.img} />
            <Box className={styles.boxDatve}>
                <div className={styles.textDatve}>CHỌN TUYẾN MỚI</div>
            </Box>
            <Box className={styles.box1}>
                <Box className={styles.boxTim}>
                    <Box className={styles.boxKhuhoi}>
                        {/* <div className={styles.text}>Khứ hồi</div>
                        <IOSSwitch
                            className={styles.swi}
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'custom switch' }}
                        /> */}
                    </Box>
                    <div className={styles.fieldContainer}>
                        <div className={styles.field}>
                            <label htmlFor="departure" className={styles.text}>Điểm đi</label>
                            <input type="text" id="departure" className={styles.inputField}   value={searchParams.departPlace}
    onChange={(e) => setSearchParams({ ...searchParams, departPlace: e.target.value })}/>
                        </div>
                        <div className={styles.swap}><SwapIcon /></div>
                        <div className={styles.field}>
                            <label htmlFor="arrival" className={styles.text}>Điểm đến</label>
                            <input type="text" id="arrival" className={styles.inputField}  value={searchParams.arrivalPlace}
    onChange={(e) => setSearchParams({ ...searchParams, arrivalPlace: e.target.value })} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="departureDate" className={styles.text}>Ngày đi</label>
                            <input
                                type="date"
                                id="departureDate"
                                className={`${styles.inputField} ${checked ? styles.inputField1 : ''}`} value={searchParams.departureDate}
                                onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
                            />
                        </div>
                    </div>
                </Box>
                <div className={styles.buttonContainer}>
                    <button className={styles.searchButton} onClick={handleSearch}>Tìm chuyến xe</button>
                </div>
            </Box>

            {/* <div className={styles.titleLoc}>Lọc</div> */}
            <div className={styles.scheduleSection}>
                {loading ? (
                    <div>Đang tải...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    schedules.map((schedule, index) => (
                        <div key={index} className={styles.scheduleCard}>
                            <div className={styles.timeInfo}>
                                <div className={styles.time}>{schedule.departureTime}</div>
                                <div className={styles.station}>{schedule.routeName.split(' - ')[0]}</div>
                            </div>
                            <div className={styles.duration}>
                                <span>{formatDuration(schedule.duration)}</span>
                            </div>

                            <div className={styles.timeInfo1}>
                                <div className={styles.time}>{schedule.arrivalTime}</div>
                                <div className={styles.station}>{schedule.routeName.split(' - ')[1]}</div>
                            </div>
                            <div className={styles.seatsAndPrice}>
                                <span>{schedule.seatsAvailable} ghế trống</span>
                                <span className={styles.price}>{schedule.price} VND</span>
                            </div>
                            <div className={styles.diden}>
                                <AdjustIcon className={styles.diemdi} />
                                <div>-------------------------------------------------------------------------</div>
                                <AdjustIcon className={styles.diemden} />
                            </div>
                            <button
                                className={styles.selectButton}
                                onClick={() => handleSelectBus(schedule.busBusRouteID, checked && selectedDeparture)}>
                                Chọn chuyến
                            </button>

                        </div>
                    ))
                )}
            </div>
            <div className={styles.bg} />
            <div className={styles.bg2} />
        </div>
    );
};

export default ChooseRouteChange;

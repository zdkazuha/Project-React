import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  TimePicker,
} from 'antd';
import dayjs from 'dayjs';
import { useToast } from '../contexts/toast.context';
import { genres as genreList, saveSessions, loadSessions } from '../services/MovieSessions';

const SessionsForm = () => {
  const [editMode, setEditMode] = useState(false);
  const [movieSessions, setMovieSessions] = useState(loadSessions());
  const [form] = Form.useForm();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setEditMode(true);
      const session = movieSessions.find(s => s.id === parseInt(params.id));
      if (session) {
        form.setFieldsValue({
          title: session.title,
          genre: session.genre,
          durationMinutes: session.durationMinutes,
          rating: session.rating,
          hall: session.hall,
          ageRestriction: session.ageRestriction,
          ticketPrice: session.ticketPrice,
          releaseDate: dayjs(session.date),
          sessionTime: dayjs(session.time, 'HH:mm:ss')
        });
      }
    }
  }, [params.id, movieSessions, form]);

  const updateSessions = (newSessions) => {
    setMovieSessions(newSessions);
    saveSessions(newSessions);
  };

  const onSubmit = (values) => {
    const sessionData = {
      ...values,
      date: values.releaseDate.format('YYYY-MM-DD'),
      time: values.sessionTime.format('HH:mm:ss')
    };

    if (editMode) {
      const updatedSessions = movieSessions.map(s =>
        s.id === parseInt(params.id) ? { ...sessionData, id: parseInt(params.id) } : s
      );
      updateSessions(updatedSessions);
      showToast('Session updated successfully!', 'success');
    } else {
      const newSession = { ...sessionData, id: movieSessions.length + 1 };
      updateSessions([...movieSessions, newSession]);
      showToast('Session created successfully!', 'success');
    }

    navigate(-1);
  };

  const onCancel = () => navigate(-1);

  return (
    <>
      <h2>{editMode ? "Edit Session" : "Create New Session"}</h2>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="title"
          label="Movie Title"
          rules={[{ required: true, message: 'Please enter a movie title' }]}
        >
          <Input placeholder="Enter movie title" />
        </Form.Item>

        <Form.Item
          name="genre"
          label="Genre"
          rules={[{ required: true, message: 'Please select a movie genre' }]}
        >
          <Select
            placeholder="Select Genre"
            options={genreList.map(g => ({ label: g, value: g }))}
          />
        </Form.Item>

        <Form.Item
          name="durationMinutes"
          label="Duration (min)"
          rules={[{ required: true, message: 'Please enter session duration' }]}
        >
          <InputNumber placeholder="Duration in minutes" />
        </Form.Item>

        <Form.Item
          name="rating"
          label="Rating"
          initialValue={0}
          rules={[{ required: true, message: 'Please enter a rating' }, { type: 'number', min: 0.1, max: 10 }]}
        >
          <InputNumber min={0} max={10} step={0.1} addonBefore="⭐" />
        </Form.Item>

        <Form.Item
          name="hall"
          label="Hall"
          rules={[{ required: true, message: 'Please select a hall' }]}
        >
          <Select options={[1, 2, 3, 4, 5].map(h => ({ label: `${h}`, value: h }))} />
        </Form.Item>

        <Form.Item
          name="ageRestriction"
          label="Age Rating"
          rules={[{ required: true, message: 'Please enter age restriction' }]}
        >
          <InputNumber placeholder="Age Rating" />
        </Form.Item>

        <Form.Item
          name="ticketPrice"
          label="Price"
          rules={[{ required: true, message: 'Please enter ticket price' }]}
        >
          <InputNumber placeholder="Ticket Price" />
        </Form.Item>

        <Form.Item
          name="releaseDate"
          label="Release Date"
          rules={[{ required: true, message: 'Please select release date' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="sessionTime"
          label="Session Time"
          rules={[{ required: true, message: 'Please select session time' }]}
        >
          <TimePicker format="HH:mm:ss" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Space>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              {editMode ? "Edit Session" : "Add Session"}
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default SessionsForm;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from 'antd';
import { useMessage } from '../hooks/useMessage';
import dayjs from 'dayjs';

const { TextArea } = Input;

const MoviesForm = () => {
  const apiGenre = 'https://api.themoviedb.org/3/genre/movie/list?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US';

  const { contextHolder, showSuccess } = useMessage();
  const [genres, setGenres] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  let params = useParams();
  

  async function fetchMoviesGenre() {
    const response = await fetch(apiGenre);
    const data = await response.json();

    const genresMap = data.genres.map(genre => ({
      value: genre.id,
      label: genre.name,
    }));

    setGenres(genresMap);
  }

  async function loadMovieData(id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US`);
    const data = await response.json();

    form.setFieldsValue({
      movieTitle: data.title,
      overview: data.overview,
      Genres: data.genres.map(genre => genre.id),
      rating: data.vote_average,
      releaseDate: dayjs(data.release_date),
      poster_url: data.poster_path,
      backdrop_url: data.backdrop_path,
    });
  }

  useEffect(() => {
    fetchMoviesGenre();

    if (params.id) {
        setEditMode(true);
        loadMovieData(params.id);
    }
  }, []);

  const onSubmit = async (movie) => {
    showSuccess(`Movie ${editMode ? 'updated' : 'created'} successfully!`);
  }

  const onCancel = () => {
    navigate(-1); 
  };

  return (
    <>
    {contextHolder}
    <h2>{editMode ? "Edit Movies" : "Create New Movies"}</h2>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      form={form}
      onFinish={onSubmit}
    >
      <Form.Item
        name="movieTitle"
        label="Movie Title"
        rules={[{ required: true, message: 'Please enter a movie title' }]}
        minLength={3}
      >
        <Input placeholder="Enter movie title" />
      </Form.Item>

      <Form.Item label="Overview" name="overview" defaultValue="This is a movie overview">
        <TextArea rows={4} placeholder="Enter your overview" />
      </Form.Item>

      <Form.Item 
        label="Genres"
        name="Genres"
        rules={[{ required: true, message: 'Please select a movie genre' }]}
      >
        <Select 
          mode="multiple" 
          placeholder="Select Genres" 
          options={genres} 
        />
      </Form.Item>

      <Form.Item 
        label="Rating"
        name="rating"
        initialValue={0}
        rules={[{ required: true, message: 'Please enter a rating' }, { type: 'number', min: 0.1, max: 10 }]}
      >
        <InputNumber
          style={{ width: 200 }}
          min={0}
          max={10}
          step={0.1}
          placeholder="Enter rating"
          addonBefore="⭐"
        />
      </Form.Item>

      <Form.Item 
        label="Release Date"
        name="releaseDate"
        rules={[{ required: true, message: 'Please select a release date' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="poster_url"
        label="Poster Path"
        rules={[{ required: true }, { type: 'png', warningOnly: true }, { type: 'string', min: 6 }]}
      >
        <Input placeholder="Enter poster path" />
      </Form.Item>

      <Form.Item
        name="backdrop_url"
        label="Backdrop Path"
        rules={[{ type: 'png', warningOnly: true }, { type: 'string', min: 6 }]}
      >
        <Input placeholder="Enter backdrop path" />
      </Form.Item>

      <Checkbox checked={true} style={{ marginBottom: '16px', marginLeft: '100px' }}>
        Adult
      </Checkbox>

      <Form.Item style={{ marginLeft: '100px' }}>
        <Space>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />} size="large">
            {editMode ? "Edit Movie" : "Add Movie"}
          </Button>
          <Button type="default" size="large" onClick={onCancel}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
    </>
  );
};

export default MoviesForm;
